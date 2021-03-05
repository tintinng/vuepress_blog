## 使用JS实现CSS动画
### CSS动画
- css动画包括两个方面：
  - 使用 ```@keyframe``` 定义动画规则
  - 为元素添加animation属性（duration、timingFunction和delay等多个属性的缩写）
- 纯css动画无法实现暂停、继续等功能，需要借助JavaScript。

整个动画的过程就是帧切换的过程，浏览器帧刷新率通常为60hz，即大约每16ms会刷新一帧，因此在js动画中，需要每16ms就确定一个帧的状态。有以下三种方案：
### setInterval
```javascript
setInterval(() => {}, 16)
```
### setTimeout
```javascript
let tick = () => {
  setTimeout(tick, 16)
}
```
### requestAnimationFrame
```javascript
let tick = () => {
  requestAnimationFrame(tick, 16)
}
```
- setTimeout和setInterval的任务放到异步队列中，只有当主线程上的任务执行完以后，才会去检查队列的任务。所以有可能主线程存在的任务执行时间过长，导致动画任务的时间不准确。
- requestAnimationFrame执行和浏览器刷新频率保持一致，不会产生跳帧的现象，保证了动画的流畅度。
## 封装Animation
- 首先需要封装一个动画，构造器需要一些必要的参数，其中：
  - object：元素样式
  - timingFunction：横轴是0到1的time，纵轴是0到1的progression。默认给一个Linear
  - template：有些属性的变换只需要属性值的改变，如：red => blue；有些则需要其他的一些值信息，如：translateX(10px) => translateX(20px)。因此需要传递一个template。默认给一个仅有值得变换
- 在每次nick的时候传入动画已经开始的时间，根据timeingFunction的特性需要做“归一化”处理
```javascript
// 属性动画：css属性值的变化
// 帧动画：每秒多少张图片的变化
// 将动画封装起来
export class Animation {
    // (Object,属性,起始值,终止值,持续时间,推迟时间,timingFunction,模板函数)
    constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
        // 默认值
        timingFunction = timingFunction || (v => v)
        template = template || (v => v)

        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.timingFunction = timingFunction;
        this.delay = delay;
        this.template = template;
    }
    // 执行函数。
    // time：动画开始后时间长
    receive(time) {
        // console.log(time)
        // 变化区间
        let range = this.endValue - this.startValue
        // TimingFunction：横轴是0到1的time，纵轴是0到1的progression
        let progress = this.timingFunction(time / this.duration)
        // 属性变换
        this.object[this.property] = this.template(this.startValue + range * progress)
    }
}
```
## 实现时间线TimeLine
- 实现时间线的一些功能：
  - pause\resume：动画的暂停和继续。（Carousel中，手动拖拽轮播图时可以暂停和继续轮播图动画的自动播放）
  - add：添加动画
  - reset：重置动画
- 实现时间线的一些关键点：
  - 使用Symbol来隐藏属性
  - 动画的执行时长t：（当前时间 - 开始时间 - 延迟时间 - 暂停时间），如果开始时间在TimeLine启动之前，则将TimeLine的启动时间作为开始时间
  - 使用state状态增加健壮性：inited、started、paused
```javascript
// 使用Symbol把tick的操作藏起来，唯一独立的值
const TICK = Symbol("tick")
const TICK_HANDLE = Symbol("tick-handler")
const ANIMATIONS = Symbol("animations")
const START_TIME = Symbol("start-time")
const PAUSE_START = Symbol("pause-start")
const PAUSE_TIME = Symbol("pause-time")

// 将动画执行自身的TICK的过程包装成一个TimeLine
// 实现一个简单的时间线：pause、resume、reset、add；
// 高级功能暂未实现：改变速率等
export class TimeLine {
    constructor() {
        // 对TimeLine进行状态管理，提高代码健壮性
        this.state = "inited"
        // TimeLine中存放一个animation的队列
        this[ANIMATIONS] = new Set()
        // 每一个animation都对应一个startTime，不一定得是在TimeLine启动的同时启动animation
        this[START_TIME] = new Map()
    }
    // 开始
    start() {
        if (this.state !== "inited") {
            return ;
        }
        this.state = "started"
        // TimeLine开始的时间
        let startTime = Date.now()
        // 暂停时长，初始化为0；动画resume的时候需要减掉暂停时长
        this[PAUSE_TIME] = 0
        // tick函数
        this[TICK] = () => {
            // 每次tick的时间
            let now = Date.now()
            // 遍历所有动画
            for (let animation of this[ANIMATIONS]) {
                // 动画的执行时间长
                let t
                // 动画的startTime小于TimeLine的startTime（动画在被add到TimeLine里面之前就已经启动了）
                if (this[START_TIME].get(animation) < startTime) {
                    t = now - startTime - this[PAUSE_TIME] - animation.delay
                } else {// 启动TimeLine之后再add animation
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay
                }
                // 动画结束：如果执行时间长大于animation设定的duration，则将对应animation移掉
                if (animation.duration < t) {
                    this[ANIMATIONS].delete(animation)
                    t = animation.duration
                }
                // t是负数则说明动画还没开始，不需要执行
                if (t > 0) {
                    // 执行动画，传入一个执行时间
                    animation.receive(t)
                }
            }
            // 每秒60次的频率调用，与浏览器屏幕的刷新次数相匹配
            // 调用自身；返回的handler可以使用cancelAnimationFrame取消
            this[TICK_HANDLE] = requestAnimationFrame(this[TICK]);
        }
        // 启动TimeLine
        this[TICK]();
    }

    // set rate(){}
    // get rate(){}
    // 暂停
    pause() {
        if (this.state !== "started") {
            return ;
        }
        this.state = "paused"
        // 记录下暂停开始的时间
        this[PAUSE_START] = Date.now()
        // cancelAnimationFrame：取消一个先前通过调用requestAnimationFrame添加过的动画帧请求
        cancelAnimationFrame(this[TICK_HANDLE]);
    }
    // 恢复
    resume() {
        if (this.state !== "paused") {
            return ;
        }
        this.state = "started"
        // 暂停时长，恢复动画的时候需要减掉暂停时长
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
        this[TICK]();
    }
    // 重启
    reset(){
        this.pause()
        // 重置状态
        this.state = "inited"
        let startTime = Date.now()
        this[PAUSE_TIME] = 0
        this[ANIMATIONS] = new Set()
        this[START_TIME] = new Map()
        this[PAUSE_START] = 0
        this[TICK_HANDLE] = null
    }
    // 添加动画
    add(animation, startTime) {
        // 如果添加动画的时候没有传入startTime参数，则给startTime一个默认值
        if (arguments.length < 2) {
            startTime = Date.now()
        }
        // 添加animation（set数据结构）
        this[ANIMATIONS].add(animation)
        // 添加<animation, startTime>（map数据结构）
        this[START_TIME].set(animation, startTime)
    }
}
```
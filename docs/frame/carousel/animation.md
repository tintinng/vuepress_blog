## 动画
### CSS动画 vs JS动画
- css动画包括两个方面：
  - 使用 ```@keyframe``` 定义动画规则
  - 为元素添加animation属性（duration、timingFunction和delay等多个属性的缩写）
- **纯css动画无法实现暂停、继续等功能。因此要借助js来控制动画**
- 使用JavaScript动画有以下三种方案：
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
## 时间线TimeLine
- 通过封装一个时间线，来控制JS动画的暂停和继续的功能
### 主要功能
- start：启动时间线TimeLine
  - **tick：回调执行requestAnimationFrame更新动画的状态**
- pause\resume：动画的暂停和继续。（**Carousel中，手动拖拽时用到**）
- add：添加动画
- reset：重置动画
```javascript
const TICK = Symbol("tick") // 表示一次页面的刷新
const TICK_HANDLE = Symbol("tick-handler")  // requestAnimationFrame的返回值
const ANIMATIONS = Symbol("animations")
const START_TIME = Symbol("start-time")
const PAUSE_START = Symbol("pause-start") // 暂停开始时间
const PAUSE_TIME = Symbol("pause-time") // 暂停时长
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
        // tick函数：表示一次页面的刷新
        this[TICK] = () => {
          //......
          this[TICK_HANDLE] = requestAnimationFrame(this[TICK]); // 回调RAF
        }
        this[TICK]();
    }
    // set rate(){}
    // get rate(){}
    // 暂停
    pause() {...}
    // 恢复
    resume() {...}
    // 重启
    reset(){...}
    // 添加动画
    add(animation, startTime) {...}
}
```
- [完整TimeLine代码](https://github.com/tintinng/Frontend-06-Template/blob/main/Week%2016/JSX/animation.js)
## 封装Animation
- constructor
  - object：元素样式
  - property：动画的属性
  - startValue：起始值
  - endValue：终止值
  - duration：动画持续时间
  - delay：动画延迟时间
  - timingFunction：变化数学模型，横轴是0到1的time，纵轴是0到1的progression。
  - template：如：translateX(10px) => translateX(20px)。
- receive
  - 接收一个动画执行时长，根据timingFunction设置对应的状态
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
    // time：动画执行时长
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

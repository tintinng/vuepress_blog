## 轮播图组件使用
```javascript
import { Carousel } from './Carousel.js'
let d = [
    {
        img: "...", // 存放图片的url
        url: "...",    // 存放点击图片跳转的url
    }
    // ......
]
// 创建组件实例
let a = <Carousel 
            src={d} 
            onChange={event => console.log("当前轮播图：" + event.detail.position)}
            onClick={event => window.location.href = event.detail.data.url}
        />
// 将组件挂载
a.mountTo(document.body)
```
### 属性attribute
- src：图片资源
### 状态state
- position：当前图片的下标
### 事件event
- onChange：轮播图切换的时候触发
- onClick：点击当前图片时触发
## 元素的样式
- 在组件创建的时候添加class```this.root.classList.add('carousel')```
```css
.carousel {
    /* 将图片横排，通过transform来切换图片 */
    overflow: hidden;
    width: 500px;
    height: 280px;
    white-space: nowrap;
}
.carousel>div {
    width: 500px;
    height: 280px;
    display: inline-block;
    background-size: contain;
    /* 图片切换的过渡效果，在拖拽不需要的时候可以用js控制 */
    transition: ease 0.5s;
}
```
## Carousel类
```javascript
import { Component, STATE, ATTRIBUTE } from "./framework.js"
import { enableGesture } from "./gesture.js"
import { Timeline, Animation } from "./animation.js"
import { ease } from "./ease.js"
export class Carousel extends Component{
    constructor() {
        super()
    }
    // 返回组件根元素
    render() {
        let handler = null;
        // 1、创建根元素
        this.root = document.createElement("div")
        // 2、添加样式
        this.root.classList.add('carousel')
        // 3、处理组件的attribute
        // ...
        // 4、启动轮播动画的时间线
        let timeline = new Timeline()
        timeline.start()
        // 5、引入手势逻辑
        enableGesture(this.root)
        // 6、监听手势事件
        this.root.addEventListener("start", event => {})
        this.root.addEventListener("tap", event => {})
        this.root.addEventListener("pan", event => {})
        this.root.addEventListener("end", event => {})
        // 7、启动轮播定时任务
        let nextPicture = () => {}
        handler = setInterval(nextPicture, 3000)
    }
```
- [完整代码](https://github.com/tintinng/Frontend-06-Template/tree/main/Week%2016/JSX/carousel.js)
### 监听手势事件
#### start
- 暂停时间线，也就暂停了轮播图的动画
- 清除轮播定时器
- 记录当前自动轮播产生的距离
#### tap
- 触发组件的click事件
#### pan
- 和轮播图功能中监听move不同的是，pan的时候需要加上额外的自动轮播产生的位移
#### end
- 重启时间线
- 给时间线添加结束动画，从move的位置到回归的位置
- 触发组件的change事件

### 启动轮播定时任务
- 给时间线添加定时动画，包括当前图片的transform和下一张图片的transform
- 触发组件的change事件
## 定义手势逻辑和事件
![](../../statics/vue/../frontEndImgs/carousel/gesture.png)
### tap手势：轻点
**tap事件**：鼠标点击；手指点击
### press手势：长按
- **press事件**：鼠标点击超过0.5s；手指点击超过0.5s
- **pressend事件**：鼠标释放后或者手指从触碰离开则产生pressend
### pan手势：拖拽（滑动）
- **panstart事件**：鼠标按下移动超过10px；手指滑动超过10px
- **pan事件**：panstart后持续移动（滑动）则会持续触发
- **panend事件**：pan后鼠标释放，手指离开屏幕
### flick手势：快速拖动（滑动）
- **flick事件**：pan结束前0.5s以内的速度 > 1.5px/ms
## 基于鼠标事件处理拖拽
- 在鼠标按下时(mousedown)监听mousemove和mouseup事件
- 在鼠标释放时取消mousemove和mouseup事件
```javascript
// 鼠标事件抽象
element.addEventListener("mousedown", event => {
      let mousemove = event => {
        ......
      }
      let mouseup = event => {
        ......
        // 鼠标释放时取消move和up事件
        document.removeEventListener("mousemove", mousemove)
        document.removeEventListener("mouseup", mouseup)
      }
      // 鼠标按下时监听move和up事件
      document.addEventListener("mousemove", mousemove)
      document.addEventListener("mouseup", mouseup)
})
```
## 触摸事件
- webAPI提供了四个基础的手势事件：
  - touchstart ：当一个或多个触摸点与触控设备表面接触时触发
  - touchmove ：当一个或多个触摸点在触控设备表面移动时触发
  - touchend ：当一个或多个触摸点从触控设备表面离开时触发
  - touchcancel ：触点被中断时触发，如：用户的触点超过了设备支持的个数
- Touch：触摸点
  - identifier：因为可能会有多个触摸点，因此需要唯一标识符
  - TouchList：一组Touch，多点触控时会产生TouchList
```javascript
element.addEventListener("touchstart", event => {
  ......
})
// touchmove的前提是touchstart
element.addEventListener("touchmove", event => {
  ......
})
element.addEventListener("touchend", event => {
  ......
})
// touch事件序列可能会被打断，end变成cancel
// 类似alert等调用会打断touch，从而触发touchcancel事件
element.addEventListener("touchcancel", event => {
  ......
})
```
## 监听手势事件函数
```javascript
export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)))
}
```
- element：监听的元素
- Listener：监听器，**监听鼠标事件和触摸事件，识别start、move、end**
- Recognizer：识别器，**处理start、move、end并派发手势事件**
- Dispatcher：派发器，**创建事件并派发**
### Listener
- 监听器，**监听鼠标事件和触摸事件，识别：start、move和end**
```javascript
// 监听：鼠标事件和手势事件
// 识别：start \ move \ end \ cancel
export class Listener {
    constructor(element, recognizer){
        // 鼠标事件
        element.addEventListener("mousedown", event => {
            recognizer.start() // 识别start
            let mousemove = event => {
                recognizer.move() // 识别move
            }
            let mouseup = event => {
                recognizer.end()  // 识别end
            }
        })
        // 触摸事件
        element.addEventListener("touchstart", event => {
            recognizer.start(touch, context)   // 识别start
        })
        element.addEventListener("touchmove", event => {
            recognizer.move(touch, context) // 识别move
        })
        element.addEventListener("touchend", event => {
            recognizer.end(touch, context)  // 识别end
        })
        // touch事件序列可能会被打断，end变成cancel
        element.addEventListener("touchcancel", event => {
            recognizer.cancel(touch, context)   // 识别cancel
        })
    }
}
```
### Recognizer
- Recognizer：**处理start、move和end，派发手势事件**
- context：手势的事件可能有多个触点，鼠标的事件也存在左中右键的区别。因此对于每一个start\move\end，需要一个对应的context来保存唯一的点（触点、鼠标键）的状态
  - startX、startY：start对应
```javascript
// 识别并分发：tap \ press\pressend \ panstart\pan\panend \ flick
export class Recognizer {
    constructor(dispatcher){
        this.dispatcher = dispatcher
    }
    start (point, context) {
        // 1、派发start手势事件
        this.dispatcher.dispatch("start", {})
        // 2、0.5s如果还未move或者end,则派发press手势事件
        context.handler = setTimeout(() => {
            this.dispatcher.dispatch("press", {}) // 派发press手势事件
        }, 500);
        // ......
    }
    move (point, context) {
        // 1、如果移动超过10px则派发panstart手势事件
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            this.dispatcher.dispatch("panstart", {}) // 派发panstart手势事件
            clearTimeout(context.handler)   // 清除检查press事件的定时器
        }
        // 2、持续派发pan手势事件
        if (context.isPan) {
            this.dispatcher.dispatch("pan", {}) // 派发pan手势事件
        }
        // ......
    }
    end (point, context) {
        // 1、派发tap手势事件或press手势事件
        if (context.isTap) {
            this.dispatcher.dispatch("tap", {}) // 派发tap手势事件
            clearTimeout(context.handler)   // 清除检查[press]的定时器
        }
        if (context.isPress) {
            this.dispatcher.dispatch("pressend", {}) // 派发pressend手势事件
        }
        // ......
        // 2、判断是否派发flick手势事件
        // 2-1、保留最近0.5s以内的move过的点
        // 2-2、计算最近0.5s以内move过的点的速度v，如果 v > 1.5px/ms 则派发flick手势事件
        if (v > 1.5) {
            this.dispatcher.dispatch("flick", {})  // 派发flick手势事件
        }
        // 2、派发panend手势事件
        if (context.isPan) {
            this.dispatcher.dispatch("panend", {})  // 派发panend手势事件
        }
    }
    cancel (point, context) {
        clearTimeout(context.handler)
        this.dispatcher.dispatch("cancel", {})
    }
}
```
- [完整代码](https://github.com/tintinng/Frontend-06-Template/blob/main/Week%2016/JSX/gesture.js)
### dispatcher
- 派发器，**创建事件并给元素派发**
```javascript
export class Dispatcher {
    constructor(element) {
        this.element = element
    }
    // 派发事件
    dispatch(type, properties) {
        let event = new Event(type)        // 创建事件，传入事件类型
        for (let name in properties) {
            event[name] = properties[name]  // 给事件添加属性
        }
        this.element.dispatchEvent(event)   // 调用接口派发事件
    }
}
```
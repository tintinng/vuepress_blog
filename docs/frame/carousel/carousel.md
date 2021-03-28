### 轮播图组件
- 属性attribute
  - src：图片资源
- 状态state
  - position：当前图片的下标
- 事件event
  - onChange：轮播图切换的时候触发
  - onClick：点击当前图片时触发
- 主要功能
  - 自动播放
  - 手动拖拽切换
### 元素的样式
- 在组件创建的时候添加class用于设置样式```this.root.classList.add('carousel')```
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
### 自动播放
- 启动定时任务，每3s移动视图内的两张图片
- 由于视图内最多只会出现了两张图片
  - 在定时任务中提前将当前图片和下一张图translate到合适位置
  - 然后异步translate当前视图内的两个图片（不用异步会覆盖掉上一步的translate）
```javascript
// 当前图片下标s
let currentIndex = 0
// 设置一个定时器，每3s切换一次
setInterval(() => {
    let children = this.root.children
    // 下一张图片的下标
    let nextIndex = (currentIndex + 1) % children.length
	// 当前图片和下一张图片
    let current = children[currentIndex]
    let next = children[nextIndex]

    // 提前把下一张轮播图移动到相邻的下一个位置
    // 由于只是提前移动，因此需要去掉过渡效果，否则影响整体的效果
    next.style.transition = "none"
    // 1、-nextIndex * 100表示将图片移到当前视图
    // 2、-nextIndex * 100 + 100表示将图片移到当前视图的下一位
    next.style.transform = `translateX(${- nextIndex * 100 + 100}%)`
    //
    setTimeout(() => {
        // 恢复去掉的过渡效果
        next.style.transition = "ease 1s"
        // 当前视图图片移动；下一张图片移到当前视图
        current.style.transform = `translateX(${- currentIndex * 100 - 100}%)`
        next.style.transform = `translateX(${- nextIndex * 100}%)`

        currentIndex = nextIndex
    }, 16)
}, 3000)
```
### 鼠标拖拽
#### 基本的鼠标拖拽框架：
- 在mousedown的时候监听mousemove和mouseup
- 在mouseup的时候取消监听
#### move
- 1、利用鼠标偏移计算视口图片下标
  - 当前图片是指组件视口中的图片，因此需要得到视口图片的下标及相邻下标
  - 每拖够500px（图片宽度）才会变化当前图片下标，最终式子为```((x - x % 500) / 500)```，既能保留正负，又能取到绝对值小的那个数。```Math.floor()```无法处理负数
- 2、拖动之前关掉transition
- 3、translate当前图片和相邻的图片
#### up
- 1、在鼠标释放的时候计算鼠标的偏移
  - 需要使用```Math.floor()```判断是否过了一半
- 2、恢复move的时候关掉的transition
- 3、translate当前图片和相邻的图片到正确的位置
  - 分四种释放节点的情况
```javascript
// 当前视图展示的图片下标
let position = 0
this.root.addEventListener("mousedown", event => {
    let children = this.root.children
    // 鼠标按下的x
    let startX = event.clientX

    let move = event => {
        // 鼠标偏移的距离
        let x = event.clientX - startX
        // 当前展示的图片的下标（保留x的符号，并且取绝对值较小的那一个，Math.floor()无法满足条件）
        let current = position - ((x - x % 500) / 500)

        // move的过程中需要移动当前的和相邻的图片
        for (let offset of [-2, -1, 0, 1, 2]) {
            // 当前和前后相邻1的图（也可以是更多）
            let pos = current + offset
            // 由于可能会向前拖动，因此要加上children.length再取余，取到图片下标
            pos = (pos + children.length) % children.length
            
            // 图片移动的时候需要关掉transition
            children[pos].style.transition = "none"
            children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
        }
    }
    
    let up = event => {
        // 鼠标up的x减去startX
        let x = event.clientX - startX
        // round四舍五入，拖动超过一半则进一
        // 拖动后如果释放，则当前视图应当显示的图片下标
        position = position - Math.round(x / 500)
        
        // 鼠标释放的时候，需要移动当前的和相邻的（视图中相邻的只会有一个）
        // 数组中第二个式子判断是前一个还是后一个
        for (let offset of [0, - Math.sign( - x % 500 + 250 * Math.sign(x))]) {
            let pos = position + offset
            pos = (pos + children.length) % children.length

            // 将视图中相邻的图片移动到正确位置
            children[pos].style.transition = ""
            children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`
        }
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
    }

    document.addEventListener("mousemove",move)
    document.addEventListener("mouseup", up)
})
```
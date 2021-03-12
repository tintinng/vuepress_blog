## 实现轮播图的效果
### 轮播图的自动播放
```javascript
// 由于视图内最多只会出现了两张图片，因此只需要提前将当前图片和下一张图移动到合适位置
let currentIndex = 0
setInterval(() => {
    let children = this.root.children
    let nextIndex = (currentIndex + 1) % children.length
		
    let current = children[currentIndex]
    let next = children[nextIndex]

    // 提前把下一张轮播图移动到相邻的下一个位置
    // 由于只是提前移动，因此需要去掉过渡效果，否则影响整体的效果
    next.style.transition = "none"
    next.style.transform = `translateX(${100 - nextIndex * 100}%)`

    setTimeout(() => {
        // 恢复去掉的过渡效果
        next.style.transition = "ease 1s"
        // 当前视图图片移动；下一张图片移到当前视图
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        next.style.transform = `translateX(${- nextIndex * 100}%)`

        currentIndex = nextIndex
    }, 16)
}, 2000)
```
### 轮播图的手动拖拽
```javascript
// 当前视图展示的图片下标
let position = 0

this.root.addEventListener("mousedown", event => {
    console.log(position)
    // console.log("mousedown")
    let children = this.root.children
    let startX = event.clientX

    let move = event => {
        // console.log("mousemove")
        // 鼠标偏移的距离
        let x = event.clientX - startX
        
        // 当前图片下标
        let current = position - ((x - x % 500) / 500)
        // console.log("current:"+current)
        // console.log(x)

        // move的过程中需要移动当前的和相邻的图片
        for (let offset of [-2, -1, 0, 1, 2]) {
            // 当前和前后相邻1的图（也可以是更多）
            let pos = current + offset
            // 由于可能会向前拖动，因此要加上children.length再取余，取到图片下标
            pos = (pos + children.length) % children.length
            // console.log("pos:"+pos)
            
            // 图片移动的时候需要关掉transition
            children[pos].style.transition = "none"
            children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
        }
    }
    
    let up = event => {
        // console.log("mouseup")   
        // 鼠标up的x减去startX，往右拖拽时：x为负数
        let x = event.clientX - startX
        // round四舍五入，拖动超过一半则进一
        // 拖动后当前视图应当显示的图片下标
        position = position - Math.round(x / 500)
        
        // 鼠标释放的时候，需要移动当前的和相邻的（视图中相邻的只会有一个）
        // 数组中第二个式子判断是前一个还是后一个
        for (let offset of [0, - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
            // console.log("offset:" + offset);
            let pos = position + offset
            pos = (pos + children.length) % children.length
            // console.log("pos:" + pos);

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
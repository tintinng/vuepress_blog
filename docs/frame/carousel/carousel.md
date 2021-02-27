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

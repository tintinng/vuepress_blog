## 轮播图组件
### 属性attribute
- src：图片资源
### 状态state
- position：当前图片的下标
### 事件event
- onChange：轮播图切换的时候触发
- onClick：点击当前图片时触发
### 主要功能
- 自动播放
- 手动拖拽切换
## 元素的样式
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
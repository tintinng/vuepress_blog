### 什么是JSX
- JSX是一种用于描述UI的JavaScript扩展语法：react框架中使用到，**将描述结构的HTML和处理数据逻辑的JavaScript结合**构成组件
- 在react中JSX语法被编译成```React.createElement(tag,attributes,children)```，函数内部实际上是使用真实的DOM API来构建节点
### JSX语法基础
- 类XML语法
- 原生DOM类型标签和自定义组件标签
  - 自定义组件标签首字母大写
- 在```{}```内使用JavaScript表达式
- 属性名采用驼峰形式
### JSX环境
- 在webpack环境下配置babel-loader来转译
  - 使用```@babel/core和@babel/preset-env```转译ES6语法
  - 使用```@babel/plugin-transform-react-jsx```转译JSX语法
- 配置文件
```javascript
// webpack.config.js
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],	// 转换ES6语法到ES5
                        plugins: [["@babel/plugin-transform-react-jsx", {pragma:"createElement"}]] // 转换JSX
                    }
                }
            }
        ]
    },
    mode: 'development'
}
```
### CreateElement
- 在代码文件中编写的内容：
```javascript
let a = <div id="a">
    <span></span>
    <span></span>
    hello world!!
</div>
```
- 经过babel转译后的内容：
```javascript
// React.createElement => 配置pragma => createElement
var a = createElement("div", {
     id: "a"
 },
 createElement("span", null),
 createElement("span", null),
 "hello world!!"
)
```
- 因此我们的目标就是通过创建并使用```createElement```来操作dom构造JSX中定义的页面内容
```javascript
export function createElement(type, attributes, ...children) {
    // 创建元素
    let element;
    // 小写的JSX为被转换为string，表示原生的元素
    if (typeof type === 'string') {
        // 为了让原生node和组件node接口保持一致，使用wrapper包装原生node
        element = new ElementWrapper(type);
    } else {// 大写的JSX表示一个类，需要自行创建实例
        element = new type();
    }

    // 挂上属性
    for (let name in attributes) {
        element.setAttribute(name, attributes[name])
    }

    // 处理子节点
    let processChildren = (children) => {
        for (let child of children) {
            // 处理数组,递归调用processChildren
            if (Array.isArray(child)) {
                processChildren(child)
                continue;
            }
            // 文本节点
            if (typeof child === "string") {
                // 文本节点包装
                child = new TextWrapper(child) 
            }
            element.appendChild(child)
        }
    }
    processChildren(children)

    return element;
}
```
### component
- 组件在JavaScript层面表现为一个class，抽象一个通用的component类：
```javascript
// 属性和状态
const STATE = Symbol("state")
const ATTRIBUTE = Symbol("attribute")
// 事件等等
export class Component {
    constructor(type) {
        this[ATTRIBUTE] = Object.create(null)
        this[STATE] = Object.create(null)
    }
    render() {
        // 代理
        return this.root
    }
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    // 原生node可以使用原生DOM API（appendChild），但是自定义组件不能，因此通过代理来反向操作
    mountTo(parent) {
        if (!this.root) {
            this.render()
        }
        parent.appendChild(this.root)
    }
}
```
- 为了让原生node和组件node接口保持一致，使用wrapper包装原生node
```javascript
class ElementWrapper extends Component{
    constructor(type) {
        super()
        // 元素节点
        this.root = document.createElement(type)
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
}
class TextWrapper extends Component{
    constructor(content) {
        super()
        // 文本节点
        this.root = document.createTextNode(content)
    }
}
```
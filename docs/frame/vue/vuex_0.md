## vuex简介

### 什么是vuex

- 官方解释：一个专为Vue.js应用程序开发的**状态管理模式**
- 实际生产生活中有很多表示用途，比如人的专注状态是好还是坏，门窗的状态是打开还是关闭。软件来源于实际业务，在应用中，状态也有这样那样的用途。比如一个侧边栏sidebar的状态是展示还是收起，主页会有一个自定义的提示对话框，是展现还是隐藏等等。
- 生活中的状态，门窗是否关好？煤气有没有关等可能都由我们大脑记住；在vue的应用中，应用中的状态都可以由vuex来管理，提供了一套管理页面应用状态解决方案。

### vuex解决的问题

- 一个基于vue的应用通常都是由各种各样的vue组件组成，在**同一个组件**中，通过操作修改数据，最终表现为视图的变化：

![flow.png](../../statics/frontEndImgs/vue/flow.png)

- 但是在复杂的业务中**各个组件之间**会有对其他组件数据的修改，因此官网有一句话：“多个组件共享状态时，单向数据流的简洁性很容易被破坏”
- 在多个视图依赖于同一状态、多个视图需要对同一状态做出修改的时候，仅仅依靠父子组件之间的通信操作太过繁琐难以维护。因此vuex给出的解决办法是：**抽出共享状态统一管理**

## vuex的核心组成

### state

- state用于定义共享属性
- 单一状态树（Single Source Of Tree）
  - 每一个应用仅仅包含一个store实例，便于管理和维护
- 例：定义一个counter共享状态

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

// 1、安装插件
Vue.use(Vuex)

// 2、创建对象(单一状态树，一个项目里面只创建一个store实例对象)
const store = new Vuex.Store({
  // 全局状态
    state: {
        counter: 10
    }
})

// 3、导出store对象
export default store
```

### getters

- 相当于computed，“**可以认为是store中的计算属性，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会重新计算”**
- 如果需求中我们要在多个地方使用counter的平方：

```javascript
......
......
const store = new Vuex.Store({
  // 全局状态
    state: {
        counter: 10
    },
  // counter的平方
  	getters: {
        // 参数是获取state，也可以加入第二个参数获取getters
        powerCounter(state) {
            return state.counter * state.counter
        }
		}
})
......
```

### mutations

- 类似于事件，对应一个回调函数，回调函数用于修改实际的state
- **“更改Vuex的store中的状态的唯一方法是提交mutation”：**实际上可以直接修改state，但是直接修改state无法在Devtools中追踪到，非常不利于调试管理。从下图中也能看出通过mutations与Devtools有联系

![vuex.png](../../statics/frontEndImgs/vue/vuex.png)

- 对于共享状态counter的增加和减少操作：

```javascript
......
......
const store = new Vuex.Store({
  // 全局状态
    state: {
        counter: 10
    },
  // counter的平方
  	getters: {
        ......
		},
    mutations: {
        decrement(state) {
            state.counter--
        },
        // 携带参数，第一个参数是state；第二个参数传递增加的数量（也可装在一个对象中来取）
        incrementCount(state, count){
            state.counter += count
        }
    }
})
......
```

- 使用commit提交修改：

```javascript
// 自减操作
this.$store.commit('decrement')
// 增加count操作
this.$store.commit('incrementCount', count)
```

- **“mutation必须是同步函数”：**由于每一条mutation的都会被devtools捕捉记录下来，如果mutation中是一个异步函数，当mutation被触发的时候，回调函数不知道什么时候才会调用，导致无法追踪。如果存在两个mutation都包含了异步调用，实际上无法确定调用中改变state的顺序，导致无法调试。为此mutation专门用来处理同步事务，异步事务由action来处理，上图中也展示了这一点。

### actions

- 由于mutations无法进行同步操作，因此vuex推出**actions专门用来处理异步操作**
- **actions提交的是mutations**而不是直接修改state，因为**vuex中所有对state的追踪都是通过mutation完成**
- actions回调函数包含两个参数：
  - context：全局上下文，可以简单理解为store实例（模块内有局部上下文）
  - payload：负载参数
- 将增加操作改为2s后的异步操作：

```javascript
......
......
const store = new Vuex.Store({
  // 全局状态
    state: {
        ......
    },
  // counter的平方
  	getters: {
        ......
		},
    mutations: {
        decrement(state) {
            state.counter--
        },
        // 携带参数，第一个参数是state；第二个参数传递增加的数量（也可装在一个对象中来取）
        incrementCount(state, count){
            state.counter += count
        }
    },
  	actions: {
      	aIncrementCount(context, payload){
          	// 异步操作
          	setTimeout(() => {
                // 最终还需提交mutations
                context.commit('incrementCount', payload.count)
            }, 2000);
        }
    }
})
......
```

- 使用dispatch提交：

```javascript
this.$store.dispatch('aIncrementCount', {count: 5})
```

### modules

- 由于单一状态树的原则，整个应用中只创建一个store实例。但有时候业务会有多个功能模块划分，各个模块的共享状态全部掺杂在一个store实例中也会造成store难以维护的情况。因此vuex运行在store中通过modules来划分store
- 在上述代码中创建一个专门用于A功能的moduleA：

```javascript
......
......
// 定义模块A
const moduleA = {
    state: {
        name: 'zhangsan'
    },
    mutations: {
        updateName(state, payload) {
            state.name = payload
        }
    },
    actions: {
        // 模块里面的context只会调用模块里面的mutations
        aUpdateName(context) {
            setTimeout(() => {
                context.commit('updateName', 'wangwu')
            }, 2000);
        }
    },
    getters: {
        fullname(state) {
            return state.name + '11111'
        },
        fullname3(state, getters, rootState) {
            return state.name + '+' + getters.fullname + '+' + rootState.counter
        }
    }
}

const store = new Vuex.Store({
  // 全局状态
    state: {
     ......
    },
  // counter的平方
  	getters: {
      ......
		},
    mutations: {
      ......
    },
  	actions: {
      ......
    },
    // store实例中包含模块A
  	modules: {
        a: moduleA
    }
})
......
```

## 
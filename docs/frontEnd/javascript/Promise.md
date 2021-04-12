**Promise是一种异步解决方案，解决了异步编码风格的问题**
- 抽象的表示一个异步操作
- 异步操作会改变状态并生成value或者reason
### 创建promise实例
#### 状态机
- pending \ resolved \ rejected
- 状态是私有的，无法通过Javascript检测到
- 状态只能改变一次
#### Executor
- 执行函数是同步执行的
- 主要职责：初始化期约的异步行为和控制状态的最终转换
#### Promise.resolve()
```Promise.resolve() 等价于 new Promise((resolve, reject) => resolve()) ```
- 幂等性：如果传入一个promise实例，相当于一个空包装（即使是包装一个new Error()）
#### Promise.reject()
```Promise.reject() 等价于 new Promise((resolve, reject) => reject()) ```
- 非幂等：如果传入一个promise实例，则会成为reject的reason
- 拒绝期约的错误并没有抛到执行同步代码里，而是通过浏览器异步消息队列来处理
### 实例方法
- 连接外部同步代码与内部异步代码
#### then
```p.then(onResolved, onRejected)```返回一个用```Promise.resolve```包装的新的promise实例
- 1-不提供onResolved, onRejected：包装上一个promise实例
- 2-没有显示返回：包装undefined
- 3-throw异常：返回一个reject的promise实例
#### catch
语法糖：```p.then(null, onRejected)```
#### finally
promise实例在解决或拒绝后都会执行
### 合成与串联
#### Promise.all
将多个promise实例包装为一个promise实例
- 至少有一个pending：返回``` Promise <pending>```
- 全部成功resolved：返回``` [promise1 value, promise2 value, promise3 value]```
- 至少有一个rejected：返回``` Promise<rejected> 第一个rejected的reason```
#### Promise.race
- 返回一组集合中最先resolve或者reject的promise实例镜像
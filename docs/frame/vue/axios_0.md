## 简单使用
- 直接使用axios提供的一些API
### axios(config)

- 直接在config中写入请求url，请求方式等配置
```javascript
// 直接在config中写入配置
axios({
  url: 'http://httpbin.org/get',
  method: 'get'
}).then(response => {
  	console.log(response)
	})
```
### axios.get()

- 使用指定method的请求，此处get请求和上面的config形式的请求一样
```javascript
axios.get('http://httpbin.org/get')
	.then(response => {
  	console.log(response)
	})
```
### axios.all()

- 同时发送多个请求
```javascript
axios.all([
  axios({
    url: 'http://httpbin.org/get',
    method: 'get'
  }),
  axios({
    url: 'http://httpbin.org/post',
    method: 'post'
  })
]).then( response => {
  	console.log(response)
	})
```
## 配置默认值
- 指定被用在各个请求的配置默认值
```javascript
axios.defaults.baseURL = 'http://httpbin.org' // 整个请求就变成baseURL + url
axios.defaults.timeout = 3000 // 设置超时时间

axios.all([
  axios({
    url: '/get',
    method: 'get'
  }),
  axios({
    url: '/post',
    method: 'post'
  })
]).then(response => {
  	console.log(response)
	})
```
## axios实例
```javascript
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://httpbin.org/',
  timeout: 5000
})

// 使用axios实例发送请求
instance({
  url: '/get'
}).then( response => {
  	console.log(response)
	})
```
## Promise & 封装
- axios依赖原生的ES6 Promise，请求后返回的就是Promise对象，因此可以链式调用。
- 将axios实例封装在一个函数中
  - 抽出公共的配置初始化
  - 万一需要切换第三方库，可以直接去这个封装的request里面替换
```javascript
// axios封装在request.js中
import axios from 'axios'

export function request(config) {
    // 1、创建axios实例
    const instance = axios.create({
      baseURL: 'http://httpbin.org/',
      timeout: 5000
    })
    // 2、发送网络请求
    return instance(config)
}

// 引入将axios封装好的request.js
import { request } from './network/request'

// 使用Promise链式调用，请求完成后通过then和catch进行后续处理
request({
  url: '/get'
}).then(res => {
  	console.log(res)
	}).catch(err => {
  	console.log(err)
	})
```
<a name="ojiVP"></a>
## 使用拦截器

```javascript
// axios封装在reques.js中
import axios from 'axios'

export function request(config) {
    // 1、创建axios实例
    const instance = axios.create({
      baseURL: 'http://httpbin.org/',
      timeout: 5000
    })
    
    // 2、axios拦截器
    // 请求拦截
    instance.interceptors.request.use(config => {
        console.log(config)
        // 1、config中的一些信息要满足服务器的请求要求
        // 2、某些网络请求必须携带一些特殊的信息（token）

        // 拦截后要继续发送
        return config
    }, err => {
        console.log(err)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
        console.log(res)
        // 一般在响应拦截中取只需要的数据data

        // 拦截后也需要返回数据
        return res.data
    }, err => {
        console.log(err)
    })
    
    // 3、发送网络请求
    return instance(config)
}

// 引入将axios封装好的request.js
import { request } from './network/request'

// 使用Promise链式调用，请求完成后通过then和catch进行后续处理
request({
  url: '/get'
}).then(res => {
  	console.log(res)
	}).catch(err => {
  	console.log(err)
	})
```

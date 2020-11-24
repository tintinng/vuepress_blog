## axios请求使用
<a name="Kpmcl"></a>
### 安装/引用

- 使用npm： ``npm install axios` 
- 在js文件中引用： ``import axios from 'axios'` 
<a name="brIEN"></a>
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
<a name="CtQxz"></a>
### axios.get()

- 使用指定method的请求，此处get请求和上面的config形式的请求一样
```javascript
axios.get('http://httpbin.org/get')
	.then(response => {
  	console.log(response)
	})
```
<a name="TVjc5"></a>
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
<a name="P5HL7"></a>
## axios的全局配置
<a name="Sy9rL"></a>
### 请求根路径baseURL

- ``axios.defaults.baseURL` 
<a name="SZjdY"></a>
### 超时设置timeout

- ``axios.defaults.timeout`
<a name="lEwMJ"></a>
### 全局配置后
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
<a name="FzQEp"></a>
### 其他常见的配置选项

- 请求前数据处理
- 请求后数据处理
- 请求路径
- 请求方法
- 自定义请求头
<a name="MNpVw"></a>
## axios实例
<a name="LZT50"></a>
### 全局axios实例的问题

- 当服务端部署在多个服务器上，有可能不同模块会使用不同的服务器，因此请求的IP地址也可能不同
- 使用唯一的全局axios实例会带来混淆
<a name="zRVSd"></a>
### 创建axios实例
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
<a name="5LOkc"></a>
## axios模块封装
<a name="5gV3z"></a>
### 为什么要封装？

- 当一个第三方框架在很多组件中都使用到的时候，一旦该框架出现问题，后期维护修改的时候需要在每个组件中去修改
- 把axios封装到一个模块中，在组件中使用这个模块，以后需要切换axios成其他第三方框架的时候只需要在这个模块中修改
<a name="I1Pc3"></a>
### 封装成request

- 将axios封装到request中，请求后的操作有三种方式，分别是
   - 使用回调函数
   - 使用Promise包裹
   - 直接返回axios请求（最终方案）
- 使用回调函数进行后续处理
```javascript
// axios封装在reques.js中
import axios from 'axios'

export function request(config, suceess, failure) {
    // 1、创建axios实例
    const instance = axios.create({
        baseURL: 'http://httpbin.org/',
        timeout: 5000
    })

    // 2、发送网络请求使用回调函数处理
    instance(config)
        .then( res => {
            // 回调success
            suceess(res)
        })
        .catch( err => {
            // 回调failure
            failure(err)
        })
}

// 引入将axios封装好的request.js
import { request } from './network/request'

// 传入两个回调函数
request({
  url: '/get'
}, res => {
  console.log(res)
}, err => {
  console.log(err)
})
```

- 使用Promise包裹
```javascript
// axios封装在reques.js中
import axios from 'axios'

export function request(config) {
    // 使用Promise
    return new Promise((resolve, reject) => {
        // 1、创建axios实例
        const instance = axios.create({
            baseURL: 'http://httpbin.org/',
            timeout: 5000
        })

        // 2、发送网络请求使用Promise的链式处理
        instance(config)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
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

- **直接返回axios请求**。axios官网介绍了axios依赖原生的ES6 Promise，请求后返回的就是Promise对象，因此可以链式调用。
```javascript
// axios封装在reques.js中
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
## axios拦截器
<a name="UJ7GG"></a>
### 请求拦截

- config中的一些信息要满足服务器的请求要
- 每次请求的时候展示logo
- 某些网络请求必须携带一些特殊的信息（token）
- 注意：拦截后要继续发送config
<a name="uYjwq"></a>
### 响应拦截

- 一般在响应拦截中截取data
- 注意：拦截后需要返回数据
<a name="fryYP"></a>
### 加入请求和响应拦截
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
            // 2、每次请求的时候展示logo
            // 3、某些网络请求必须携带一些特殊的信息（token）

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

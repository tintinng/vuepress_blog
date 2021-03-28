## 路由表
路由配置包括```constantRoutes```和```asyncRoutes```两部分。```constantRoutes```用于配置所有角色都可以访问到的组件页面，```asyncRoutes```用于配置指定角色才能访问到的页面。
详细业务相关不便展示，这里只贴出用户管理模块的路由配置：
```javascript
export const constantRoutes = [
    {......},
    {......}
]
export const asyncRoutes = [
    {......},
    {
        path: '/userManagement',
        component: Layout,
        redirect: '/userManagement/index',
        name: 'UserManagement',
        // admin权限
        meta: { title: '用户管理', icon: 'user', roles: ['admin'] },
        children: [{
        path: 'index',
        name: 'userList',
        component: () => import('@/views/userManagement/index'),
        // roles是一个数组，因为页面权限可能对应多个角色。admin管理员角色
        meta: { title: '用户列表', roles: ['admin'] }
        }]
    },
    // 如果没有匹配上的路由，则会重定向到 404 页面；
    // 重定向必须放在最后，如果放在前面会被优先命中
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }), // 切换路由时页面滚动到顶部
  routes: constantRoutes
})

const router = createRouter()
export default router
```
## 全局导航守卫
导航守卫用于在组件之间的切换中实现特定功能，例如：权限判断、登陆状态判断等。
项目配置了一个全局前置路由钩子```@src/permisson.js```,实现用户登录状态的判断和页面权限的判断。
### 1-判断登录状态
登录状态的判断使用```js-cookie```第三方库获取cookie。
- 登录的时候会得到服务端返回的权限字段，存储在本地cookie中。
  - 如果用户未登录且页面也不在```白名单```中，则会重定向到登录页面```@src/views/login```
```javascript
import { getToken, getUser } from '@/utils/auth' // get token from cookie
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
    const hasToken = getToken()
    if (hasToken) {
        ......
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
        }
    }
}
```
### 2-判断用户的权限
- 如果进入到的是登录页面，则直接放行。
- 如果当前处于登录状态，则判断用户角色role，
  - 如果存在role，说明对应的路由表已经生成好，直接放行。
  - 否则是首次登录系统，则要动态生成对应角色权限的路由表。
```javascript
......
if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page 如果已经登录，重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 使用vuex中user模块的role来判断是否是已经添加路由，防止重复添加路由
      const role = store.getters.role
      if (role) {
        next()
      } else {
        try {
            // js-cookie获取用户角色
          const role = getUser()

          // 添加路由之前加入使用vuex保存user role状态，标志已经添加过路由
          store.dispatch('user/getInfo')
          // 从asyncRoutes中获取属于role的页面路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', role)
          // 添加路由
          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
          NProgress.done()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
      ......
    }
......
```
在全局状态管理```@src/store/modules/permission.js```中根据路由表的配置获取对应权限路由：
```javascript
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    // 根据路由表配置的meta.roles判断
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  // 对每一条路由进行判断
  routes.forEach(route => {
    // 浅拷贝
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
        // 递归判断子路由权限
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
    // 由于可能存在一个用户多种角色的情况，因此这里的roles处理为一个数组。但在本项目中只有管理员和普通用户两个角色，一个用户也只能对应其中一种角色
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 如果存在admin的角色，则需包括asyncRoutes中的所有路由
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
          // 否则过滤对应的角色路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

## 页面骨架Layout
整个vue根实例就只有一个router-view路由出口：
```html
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```
所有的页面组件都会展示在这里，这里用到vue-router的嵌套路由，整个项目除了登录页面和404页面外，其他页面组件都用一个Loyout组件来包裹，一级路由对应的组件都是Layout,构成了整个页面的骨架：
![](../../statics/vue/../frontEndImgs/vue/vueAdmin/layout1.png)
当前Layout组件的骨架包括：侧边栏sidebar、头部navbar和主体区域appmain，从代码和Vue Devtools中也可以很清楚的看出Layout骨架结构：
```html
// 这里省掉了传入组件的值和样式
<template>
  <div>
    <sidebar />
    <div class="main-container">
      <div
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>
```
![](../../statics/vue/../frontEndImgs/vue/vueAdmin/layout2.png)
## 侧边栏Sidebar
侧边栏组件内部使用了[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)
### el-scroller
侧边栏整体上就是一个导航菜单列表，当列表项过多时就需要用滚动条来展示。(el-scroller并没有写在element-ui的官方文档中，项目引入了完整的element-ui，在这里只是简单的使用没有传递任何属性值。)
### el-menu
菜单列表是侧边栏的主体，主要是配置一些菜单属性
```html
<el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
    :unique-opened="false"
    :collapse-transition="false"
    mode="vertical"
>
```
- default-active表示当前激活菜单的 index，计算属性,依赖于当前子路由，可以在路由中配置meta指定激活菜单
- collapse表示是否水平折叠。计算属性，依赖store，使用vuex管理
- background-color表示菜单项的背景颜色，text-color表示菜单项的文字颜色，active-text-color表示激活菜单项的文字颜色。这些值都使用scss的变量，用一个样式文件统一管理。
### **sidebar-item**
sidebar-item是处理路由菜单展示的关键组件，为了支持[配置项](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9)一系列功能，做了很多处理：
- 子菜单or子菜单项

判断当前路由的children，如果声明的children里的子路由大于1个，或者配置路由时显示指定alwayShow:true。则使用子菜单组件，并递归使用siderbar-item组件。否则，使用子菜单项组件。
```html
<template>
  <div v-if="!item.hidden">
  // 这里判断子路由情况，也是递归组件的出口
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      // 组件递归引用
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
```
- applink组件：组件路由or外部链接

link使用动态组件，用于判断配置的路由是使用路由出口router-link还是使用a标签
```html
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>

```

- item组件: svg图标 or element-ui图标

element-ui中的icon都有el-icon前缀，因此此处基于此判断
```html
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

```
## Navbar
头部导航栏包含一个用于控制侧边栏收缩的图标、面包屑组件和用户头像。

由于nav-bar和side-bar是兄弟组件关系，无法使用父子组件的通信，因此在全局store中管理侧边栏收缩状态：
```html
<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
```
```javascript
methods: {
  ...mapGetters([
      'sidebar',
      'avatar'
  ]),
  toggleSideBar() {
    this.$store.dispatch('app/toggleSideBar')
  },
  ...
}
```
使用cookie存储，下一次打开的时候可以使用上一次的状态``store\module\app.js``
```javascript
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```
## AppMain
app-main组件就是嵌套子路由的路由出口，使用```<transition>```添加动画效果：
```html
<section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
</section>

export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
```

## 布局总结
总体来讲就是布局就是一个Layout组件，包括side-bar、nav-bar和app-main三部分，app-main承载了各个页面组件文件的展示，side-bar加上灵活路由表配置可以实现多种路由需求，nav-bar里面其实还配置了面包屑导航，通过```$route```动态生成，项目中只是简单展示了面包屑并没有设置，因此没有去研究。
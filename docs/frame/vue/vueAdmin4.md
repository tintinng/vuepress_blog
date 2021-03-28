## 项目结构
- 项目结构遵循[vuex官方推荐](https://vuex.vuejs.org/zh/guide/structure.html)
```javascript
└── store
    ├── index.js          # 组装模块并导出 store 的地方
    ├── getters.js        # 根级别的 getters
    └── modules
        ├── alarm.js      # alram模块
        └── app.js        # app模块
        └── permission.js # 权限模块
        └── setting.js    # 设置模块
        └── user.js       # 用户模块
```
## module
### app
#### state
- siderbar.opened：用于控制菜单栏的展开和收缩
- device：用于判断当前是PC(desktop)还是移动设备(mobile)
  - 当检测到在移动端打开状态时添加一个遮罩层mask
### alarm
- 有个需求是一个模块的一个字符串需要在另一个模块用到，因此需要全局状态来通信
#### state
- faultDescription
### permission
#### state
- routes：满足权限的路由表
### user
#### state
- role：用户角色
- avatar：用户头像
- name：名字
- telephone：电话
## getters
- 使用一个单独文件来统一暴露各个module的计算属性
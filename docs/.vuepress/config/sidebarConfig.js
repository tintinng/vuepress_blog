module.exports = {
    "/frontEnd/": [
        {
            title: "前端知识图谱",
            path: "./"
        },
        {
            title: "JavaScript",
            collapsable: true,
            children: [
                {
                    title: "3-数据类型",
                    path: "./javascript/数据类型.md"
                },
                {
                    title: "6-数组操作总结",
                    path: "./javascript/数组操作总结.md"

                },
                {
                    title: "6-字符串操作总结",
                    path: "./javascript/字符串操作总结.md"
                },
                {
                    title: "8-对象",
                    path: "./javascript/对象.md"
                },
                {
                    title: "8-对象操作总结",
                    path: "./javascript/对象操作总结.md"
                },
                {
                    title: "8-继承",
                    path: "./javascript/继承.md"
                },
                {
                    title: "10-函数",
                    path: "./javascript/函数.md"
                }
            ]
        }
    ],
    "/frame/": [
        {
            title: 'Vue',
            collapsable: false,
            children: [
                { title: "axios入门", path: "./vue/axios_0.md" },
                { title: "vuex入门", path: "./vue/vuex_0.md" }
            ]
        },
        {
            title: 'VueAdmin系列总结',
            collapsable: false,
            children: [
                { title: "布局与路由", path: "./vue/vueAdmin1.md" },
                { title: "路由与权限", path: "./vue/vueAdmin2.md" },
                { title: "全局状态管理", path: "./vue/vueAdmin4.md" },
            ]
        },
        {
            title: 'Carousel组件库总结',
            collapsable: false,
            children: [
                { title: "简易动画库", path: "./carousel/animation.md" },
                { title: "简易手势库", path: "./carousel/gesture.md" }
            ]
        }
    ],
    "/CSbase/": [
        {
            title: '浏览器原理',
            collapsable: false,
            children: [
                { title: '从URL到页面展示', path: "./browser/" },
            ]
        },
        {
            title: 'http',
            collapsable: false,
            children: [
                { title: 'http报文格式', path: "./net/httpFormat.md" },
                { title: 'http1和http2', path: "./net/http1&http2.md" },
                { title: 'http和https', path: "./net/http&https.md" }
            ]
        }
    ],
    "/tools/": [
        {
            title: 'git',
            collapsable: false,
            children: [
                { title: "git图示理解", path: "Git使用心得.md" }
            ]
        },
        {
            title: 'Nginx',
            collapsable: false,
            children: [
                { title: "Nginx部署", path: "Nginx部署.md" }
            ]
        },
        {
            title: '数据结构与算法',
            collapsable: true,
            children: [
                { title: "位运算", path: "位运算.md" },
                { title: "查找", path: "查找.md" }
            ]

        }
    ],
    "/shortcuts/": [{
        title: "VSCode快捷键",
        path: "vscode.md"
    }]
    // "/CSbase/CSnetwork": [""],
    // "/CSbase/dataStruAndAlgorith": [""]
}
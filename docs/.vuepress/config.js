module.exports = {
    title: '叮叮叮的博客',
    description: '你好，欢迎来到我的博客',
    base: '/tintinblog/',
    head:[
        ['link', {rel: 'icon', href:'/logo.png' }]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            {text: '首页', link: '/' },
            {text: '前端', link: '/frontEnd/' },
            {text: '后端', link: '/backEnd/' },
            {text: '通用工具', link: '/tools/'},
            {text: '快捷键', link: '/shortcuts/'},
            // {
            //     text: '计算机基础',
            //     items: [
            //         {text: '计算机网络', link:'/CSbase/CSnetwork/'},
            //         {text: '数据结构与算法', link:'/CSbase/dataStruAndAlgorith/'}                    
            //     ]
            // },
            {text: 'Github', link: 'https://github.com/tintinng' }
        ],
        sidebar: {
            "/frontEnd/": [
                {
                    title: "JavaScript",
                    collapsable: true,
                    children: [
                        {
                            title: "数据类型", 
                            path: "./javascript/数据类型.md"
                        },
                        {
                            title: "对象与类", 
                            path: "./javascript/创建对象.md"
                        },
                        {
                            title: "继承", 
                            path: "./javascript/继承.md"
                        }
                    ]
                },
                {
                    title: 'vue',
                    collapsable: true,
                    children: [
                        {title: "axios入门", path: "./vue/axios_0.md"},
                        {title: "vuex入门", path: "./vue/vuex_0.md"}
                    ]
                }
            ],
            "/backEnd/": [{
                title: 'Java语言',
                collapsable: false,
                children: [
                    {title: "Java简介", path: "./Java/introduce.md"},
                ]
            }],
            "/tools/": [
                {
                    title: 'git',
                    collapsable: false,
                    children: [
                        {title: "git图示理解", path: "Git使用心得.md"}
                    ]
                },
                {
                    title: 'Nginx',
                    collapsable: false,
                    children: [
                        {title: "Nginx部署", path: "Nginx部署.md"}
                    ]
                }
            ],
            "/shortcuts/": [{
                title: "VSCode快捷键",
                path: "vscode.md"
            }]
            // "/CSbase/CSnetwork": [""],
            // "/CSbase/dataStruAndAlgorith": [""]
        },
        sidebarDepth: 2
    }
};
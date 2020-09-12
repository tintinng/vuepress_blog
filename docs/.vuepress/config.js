module.exports = {
    title: '叮叮叮',
    description: '你好，欢迎来到我的博客',
    base: '/tintinblog',
    head:[
        ['link', {rel: 'icon', href:'/1.jpg' }]
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
            // {
            //     text: '计算机基础',
            //     items: [
            //         {text: '计算机网络', link:'/CSbase/CSnetwork/'},
            //         {text: '数据结构与算法', link:'/CSbase/dataStruAndAlgorith/'}                    
            //     ]
            // },
            {text: '外部链接', link: 'https://www.google.com' }
        ],
        sidebar: {
            "/frontEnd/": [""],
            "/backEnd/": [{
                title: 'Java语言',
                children: [
                    {title: "Java简介", path: "./Java/introduce.md"},
                ]
            }],
            "/tools/": [{
                title: 'git',
                children: [
                    {title: "git图示理解", path: "Git使用心得.md"},
                ]
            }],
            // "/CSbase/CSnetwork": [""],
            // "/CSbase/dataStruAndAlgorith": [""]
        },
        sidebarDepth: 2
    }
};
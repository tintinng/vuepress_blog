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
                { title: "axios使用体验", path: "./vue/axios_0.md" },
                { title: "vuex使用体验", path: "./vue/vuex_0.md" }
            ]
        }
    ],
    "/backEnd/": [{
        title: 'Java语言',
        collapsable: false,
        children: [
            { title: "Java简介", path: "./Java/introduce.md" },
        ]
    }],
    "/CSbase/": [{
        title: 'http',
        collapsable: false,
        children: [
            { title: 'http报文格式', path: "./net/httpFormat.md" },
            { title: 'http1和http2', path: "./net/http1&http2.md" },
            { title: 'http和https', path: "./net/http&https.md" }
        ]
    }],
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
        }
    ],
    "/shortcuts/": [{
        title: "VSCode快捷键",
        path: "vscode.md"
    }]
    // "/CSbase/CSnetwork": [""],
    // "/CSbase/dataStruAndAlgorith": [""]
}
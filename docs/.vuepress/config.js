const headConfig = require("./config/headConfig");
const pluginsConfig = require("./config/pluginsConfig");
const navConfig = require("./config/navCinfig")
const sidebarConfig = require("./config/sidebarConfig")

module.exports = {
    title: '叮叮叮的博客',
    description: '你好，欢迎来到我的博客',
    base: '/tintinblog/',
    head: headConfig,
    plugins: pluginsConfig,
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: navConfig,
        sidebar: sidebarConfig,
        sidebarDepth: 2
    }
};
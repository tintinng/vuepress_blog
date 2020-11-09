(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{367:function(t,v,_){"use strict";_.r(v);var a=_(42),l=Object(a.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"简介"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[t._v("#")]),t._v(" 简介")]),t._v(" "),_("p",[t._v("HTTP协议几乎是现在互联网应用层用的最广泛的网络协议，基于TCP协议，给互联网的信息传输带来极大便利。以下大概介绍不同版本带来的变化。")]),t._v(" "),_("h2",{attrs:{id:"http-1"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http-1"}},[t._v("#")]),t._v(" HTTP/1")]),t._v(" "),_("h3",{attrs:{id:"http-0-9"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http-0-9"}},[t._v("#")]),t._v(" HTTP/0.9")]),t._v(" "),_("ul",[_("li",[t._v("http/0.9诞生于1991年，最初主要用于在网络之间传递HTML超文本内容，因此被称为"),_("strong",[t._v("超文本传输协议")]),t._v("。")]),t._v(" "),_("li",[t._v("http/0.9只是用于传输体积很小的HTML文件，有以下三个特点：\n"),_("ul",[_("li",[t._v("没有请求头和请求体")]),t._v(" "),_("li",[t._v("服务器没有返回头信息，只有返回数据")]),t._v(" "),_("li",[t._v("使用ASCII字符流传输")])])])]),t._v(" "),_("h3",{attrs:{id:"http-1-0"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http-1-0"}},[t._v("#")]),t._v(" HTTP/1.0")]),t._v(" "),_("ul",[_("li",[t._v("万维网的发展带来了很多新的需求，浏览器中展示的不只是HTML文件了，还包括JavaScript、CSS、图片、音频等。支持多种类型的文件下载是HTTP/1.0的核心诉求。")]),t._v(" "),_("li",[t._v("引入请求头和响应头，使得浏览器和服务器之间可以通过头信息协商以支持不同格式的数据对接.(具体查看http格式图片)")]),t._v(" "),_("li",[t._v("请求头的协商信息\n"),_("ul",[_("li",[t._v("accept：text/html（期待服务器返回的文件类型）")]),t._v(" "),_("li",[t._v("accept-encoding: gzip, deflate, br（期待服务器采取的压缩方式）")]),t._v(" "),_("li",[t._v("accept-Charset: ISO-8859-1, utf-8（期待的文件编码格式）")]),t._v(" "),_("li",[t._v("accept-language: zh-CN, zh（期待的文件语言）")])])]),t._v(" "),_("li",[t._v("响应头的协商信息\n"),_("ul",[_("li",[t._v("content-encoding: br")]),t._v(" "),_("li",[t._v("content-type: text/html; charset=UTF-8")])])]),t._v(" "),_("li",[t._v("引入状态码和Cache机制")])]),t._v(" "),_("h3",{attrs:{id:"http-1-1-目前常用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http-1-1-目前常用"}},[t._v("#")]),t._v(" HTTP/1.1（目前常用）")]),t._v(" "),_("ul",[_("li",[t._v("改进持久连接\n"),_("ul",[_("li",[t._v("在一个TCP连接上可以传输多个HTTP请求，只要浏览器或者服务器没有明确断开连接，那么该TCP连接会一直保持")]),t._v(" "),_("li",[t._v("有效减少TCP建立连接和断开连接的次数")]),t._v(" "),_("li",[t._v("一个域名默认允许同时建立6个TCP持久连接")])])]),t._v(" "),_("li",[t._v("引入Cookie机制\n"),_("ul",[_("li",[t._v("服务器委托浏览器存储在浏览器本地的一些数据，用于记录用户的关键标识信息")]),t._v(" "),_("li",[t._v("常见Cookie属性\n"),_("ul",[_("li",[t._v("生存周期相关：Expires、Max-Age")]),t._v(" "),_("li",[t._v("作用域相关：Domain、Path")]),t._v(" "),_("li",[t._v("安全性相关：HttpOnly、SameSite、Secure")])])])])]),t._v(" "),_("li",[t._v("提供虚拟主机支持\n"),_("ul",[_("li",[t._v("http/1.1请求头增加Host字段")])])])]),t._v(" "),_("h2",{attrs:{id:"http-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http-2"}},[t._v("#")]),t._v(" HTTP/2")]),t._v(" "),_("h3",{attrs:{id:"多路复用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#多路复用"}},[t._v("#")]),t._v(" 多路复用")]),t._v(" "),_("ul",[_("li",[t._v("多路复用机制是http2.0最核心、最重要的一个变化，"),_("strong",[t._v("主要解决HTTP队头阻塞的问题")]),t._v(" "),_("ul",[_("li",[t._v("http/1.1中http请求（响应）必须在上一个完成后才能继续下一个请求（响应），无法进行http请求（响应）的并行。当某一个请求没有得到响应而阻塞，后面的请求（响应）就会一直等待，这就是队头阻塞。")])])]),t._v(" "),_("li",[t._v("二进制分帧\n"),_("ul",[_("li",[t._v("多路复用采用二进制分帧技术，"),_("strong",[t._v("将http报文交给tcp传输层时，先进行二进制分帧")]),t._v("，将同一个请求（响应）分成编号相同的一帧一帧的数据发送。")])])]),t._v(" "),_("li",[t._v("多路复用的好处\n"),_("ul",[_("li",[t._v("请求可以并行，不需要等待阻塞。")]),t._v(" "),_("li",[t._v("服务器可以根据请求情况响应优先级较高的请求。")])])])]),t._v(" "),_("h3",{attrs:{id:"单tcp连接"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#单tcp连接"}},[t._v("#")]),t._v(" 单TCP连接")]),t._v(" "),_("ul",[_("li",[t._v("一个域名对应一个TCP长连接\n"),_("ul",[_("li",[t._v("避免多个TCP连接之间的竞争")]),t._v(" "),_("li",[t._v("一个TCP连接只需要一次慢启动")])])])]),t._v(" "),_("h3",{attrs:{id:"头部压缩"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#头部压缩"}},[t._v("#")]),t._v(" 头部压缩")]),t._v(" "),_("ul",[_("li",[t._v("建立索引表\n"),_("ul",[_("li",[t._v("在两端建立一个key-value的索引表，传输的时候只需要发送表中的索引")])])])]),t._v(" "),_("h3",{attrs:{id:"服务器推送"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#服务器推送"}},[t._v("#")]),t._v(" 服务器推送")]),t._v(" "),_("ul",[_("li",[t._v("无需明确地建立请求\n"),_("ul",[_("li",[t._v("场景：主页发起请求，服务器响应主页内容、logo以及样式表，不仅仅只响应主页的请求，还会响应相关的内容。")])])])])])}),[],!1,null,null,null);v.default=l.exports}}]);
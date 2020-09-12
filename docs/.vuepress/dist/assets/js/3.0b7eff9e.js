(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{348:function(t,s,a){t.exports=a.p+"assets/img/repo-historyStatus-1584433001399.2c8cf558.png"},349:function(t,s,a){t.exports=a.p+"assets/img/commit1.65c1ec87.png"},350:function(t,s,a){t.exports=a.p+"assets/img/commit2.de5ad4a4.png"},351:function(t,s,a){t.exports=a.p+"assets/img/PPT-branch.c71f3aba.png"},352:function(t,s,a){t.exports=a.p+"assets/img/all-branches.36c8b98f.png"},353:function(t,s,a){t.exports=a.p+"assets/img/select-branches-look.af2746bf.png"},354:function(t,s,a){t.exports=a.p+"assets/img/node-shared.05b210d6.png"},355:function(t,s,a){t.exports=a.p+"assets/img/outline.c822ce07.png"},364:function(t,s,a){"use strict";a.r(s);var r=a(42),e=Object(r.a)({},(function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("p",[t._v("图例来自于一个demo练习"),r("a",{attrs:{href:"https://github.com/tintinng/advanced-git/tree/master",target:"_blank",rel:"noopener noreferrer"}},[t._v("仓库"),r("OutboundLink")],1)]),t._v(" "),r("h3",{attrs:{id:"什么是仓库"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#什么是仓库"}},[t._v("#")]),t._v(" 什么是仓库？")]),t._v(" "),r("p",[t._v("仓库是指一个历史"),r("strong",[t._v("可追溯（tracked）"),r("strong",[t._v("的文件集合，可以把该文件集合的任意一个历史状态变更看成是一个单位，图中的一个个小圆点即为该仓库的某个")]),t._v("历史状态变更")]),t._v("。\n"),r("img",{attrs:{src:a(348),alt:""}})]),t._v(" "),r("h3",{attrs:{id:"这个历史状态变更时如何产生的"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#这个历史状态变更时如何产生的"}},[t._v("#")]),t._v(" 这个历史状态变更时如何产生的？")]),t._v(" "),r("p",[r("strong",[t._v("通过commit")]),t._v("，每一次commit就会生成一个commit对象，产生一次历史状态变更。因此这一个个小圆点也可以看成是一各个commit对象。\n"),r("img",{attrs:{src:a(349),alt:""}}),t._v(" "),r("img",{attrs:{src:a(350),alt:""}})]),t._v(" "),r("h3",{attrs:{id:"如何标识这个历史状态变更"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#如何标识这个历史状态变更"}},[t._v("#")]),t._v(" 如何标识这个历史状态变更？")]),t._v(" "),r("ul",[r("li",[t._v("Commit对象的SHA-1")]),t._v(" "),r("li",[t._v("分支（branch）")]),t._v(" "),r("li",[t._v("HEAD指针")]),t._v(" "),r("li",[t._v("tag标签")])]),t._v(" "),r("h3",{attrs:{id:"什么是分支"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#什么是分支"}},[t._v("#")]),t._v(" 什么是分支？")]),t._v(" "),r("p",[r("img",{attrs:{src:a(351),alt:""}})]),t._v(" "),r("ul",[r("li",[t._v("分支是一个"),r("strong",[t._v("指向叶子节点")]),t._v("的"),r("strong",[t._v("指针")]),t._v("，"),r("strong",[t._v("每个节点都是一个历史状态变更")]),t._v("。叶子节点可以理解为最新的历史状态变更。")]),t._v(" "),r("li",[t._v("一个分支包括多个历史状态变更（节点），可以在本分支的各个历史状态变更（节点）中穿梭。")]),t._v(" "),r("li",[t._v("一个仓库通常有各种分支错综复杂，IDEA 可视化log中可以可以查看各个分支之间的关系。单个分支，select几个分分支和所有分支：\n"),r("img",{attrs:{src:a(352),alt:""}}),t._v(" "),r("img",{attrs:{src:a(353),alt:""}})])]),t._v(" "),r("h3",{attrs:{id:"各个分支之间有什么关系"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#各个分支之间有什么关系"}},[t._v("#")]),t._v(" 各个分支之间有什么关系？")]),t._v(" "),r("ul",[r("li",[t._v("各个分支之间可以共享某些节点（历史状态变更）。"),r("strong",[t._v("“我们曾经都做过这样的修改”")]),t._v(" "),r("img",{attrs:{src:a(354),alt:""}})]),t._v(" "),r("li",[t._v("多个分支可以合并，产生一个新的历史状态变更。例：我正在master分支上，要把fixbug分支上的变更内容合并过来。我（master分支）的历史状态变更向前推进一个，fixbug分支还停留在原来的历史状态变更上。")])]),t._v(" "),r("div",{staticClass:"language-java line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-java"}},[r("code",[t._v("git merge fixbug\n")])]),t._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[t._v("1")]),r("br")])]),r("ul",[r("li",[t._v("可以切换当前的工作分支，即从一个分支可以切换到（checkout）另一个分支。切换到另一个分支上工作。")])]),t._v(" "),r("h3",{attrs:{id:"远程分支和本地分支对应"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#远程分支和本地分支对应"}},[t._v("#")]),t._v(" 远程分支和本地分支对应")]),t._v(" "),r("ul",[r("li",[t._v("push成功的条件就是远程分支是我本地分支的父亲，意思就是"),r("strong",[t._v("远程做过的修改（历史状态变更/节点）我本地都做过了，所以我可以push成功，否则远程分支有另外的修改（有分叉）但我本地却没有，因此push会产生冲突")]),t._v("。通过合并（merge）\\解决冲突（solve conflict）后再合并（merge）。")]),t._v(" "),r("li",[t._v("同理，pull（fetch+merge）成功的条件是本地分支是远程分支的父亲。\n"),r("img",{attrs:{src:a(355),alt:""}})])])])}),[],!1,null,null,null);s.default=e.exports}}]);
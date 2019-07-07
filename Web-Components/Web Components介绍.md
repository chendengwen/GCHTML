##Web Components

Web Components原生的组件模式，主要有customElement，shadowDom，template等，本次主要用customElement注册自定义元素组件，shadowDom存放组件内容

说明：

 - 目前我知道的渲染后使用web components的框架有腾讯omi,谷歌polymer两个；
  omi看了一下很简单，使用jsx语法或不使用构建工具的话用h渲染函数也可以，所以自己手写试试。
  
本次试用学到的东西：
web components使用es6 class定义组件！！继承(extends HTMLElement或某个已有元素如HTMLButtonElement)，customElement.define(tagName, className) 注册组件
组件内样式独立（scoped）；shadow-dom是某些原生元素的实现(如video等)，可以简化页面结构
其他：如果兼容性好的话真是不错的选择（也有pollyfill），毕竟原生还是好


import Vue from 'vue'

// 全局配置组件
// 返回的是一个函数,这个方法有 3 个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。
const componentsContext = require.context('@/components', true, /.vue$/)
console.log(componentsContext)
// console.log('componentsContext', componentsContext.keys())
componentsContext.keys().forEach((component) => {
  const componentConfig = componentsContext(component).default
  // console.log(componentConfig)
  Vue.component(componentConfig.name, componentConfig)
})

// 源码
// var map = {
//   './Header/index.vue': './src/components/Header/index.vue',
//   './SvgIcon/index.vue': './src/components/SvgIcon/index.vue'
// }
// // componentsContext(component)
// function webpackContext(req) {
//   var id = webpackContextResolve(req)
//   return __webpack_require__(id)
// }
// function webpackContextResolve(req) {
//   if (!__webpack_require__.o(map, req)) {
//     var e = new Error("Cannot find module '" + req + "'")
//     e.code = 'MODULE_NOT_FOUND'
//     throw e
//   }
//   return map[req]
// }
// // componentsContext.keys()
// webpackContext.keys = function webpackContextKeys() {
//   return Object.keys(map)
// }
// webpackContext.resolve = webpackContextResolve
// module.exports = webpackContext
// webpackContext.id = './src/components sync recursive index.vue$'

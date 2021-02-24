import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}
// console.log(files.keys())
// 动态加载vuex,避免了以前一个一个去引用的麻烦
files.keys().forEach((key) => {
  // 只保留文件名，去除后缀
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

console.log('modules', modules)

export default new Vuex.Store({
  modules
})

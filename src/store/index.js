import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

// 动态加载vuex
files.keys().forEach((key) => {
  // 只保留文件名，去除后缀
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

console.log('modules', modules)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})

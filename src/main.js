import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/plugins/filter'

// // 引用svg icon
// import '@/assets/icons/index'

// import { Button, Cell } from 'mint-ui'

// Vue.component(Button.name, Button)
// Vue.component(Cell.name, Cell)
// 应哟个mint-ui组件
import '@/plugins/mint-ui'
import '@/plugins/common'
// normalize.css
import 'normalize.css/normalize.css'
import '@/assets/styles/theme.scss'
import directives from '@/plugins/directives'

// console.log(filters)
// 通过遍历安装filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 安装directive
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

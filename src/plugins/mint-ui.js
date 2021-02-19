// 引用svg icon
import Vue from 'vue'
import { Button, Cell, Loadmore, Spinner, Toast, InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.prototype.$Toast = Toast

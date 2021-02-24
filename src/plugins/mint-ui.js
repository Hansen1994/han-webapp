// 引用svg icon
import Vue from 'vue'
import {
  Button,
  Cell,
  Loadmore,
  Spinner,
  Toast,
  InfiniteScroll,
  Field,
  Actionsheet
} from 'mint-ui'

Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Actionsheet.name, Actionsheet)
Vue.prototype.$Toast = Toast

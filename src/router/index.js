import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/*webpackChunkName: 'home'*/ '@/views/home/index.vue')
const Catalog = () =>
  import(/*webpackChunkName: 'catalog'*/ '@/views/home/catalog.vue')
const Detail = () => import(/* webpackChunkName: 'detail' */ '@/views/detail')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    children: [
      {
        path: '',
        name: 'catalog',
        component: Catalog,
        props: true
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Catalog,
        props: true
      }
    ]
  },
  // 详情页
  {
    path: '/detail',
    name: 'detail',
    props: true,
    component: Detail
  }
]

const router = new VueRouter({
  routes
})

export default router

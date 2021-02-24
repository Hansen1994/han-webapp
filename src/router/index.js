import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import moment from 'dayjs'
import {
  SET_USER,
  SET_ISLOGIN,
  SET_TOKEN,
  INIT_WEBSOCKET
} from '@/store/mutation-types'
import { MessageBox } from 'mint-ui'

const Home = () => import(/*webpackChunkName: 'home'*/ '@/views/home/index.vue')
const Catalog = () =>
  import(/*webpackChunkName: 'catalog'*/ '@/views/home/catalog.vue')
const Detail = () => import(/* webpackChunkName: 'detail' */ '@/views/detail')
const Login = () => import(/* webpackChunkName: 'login' */ '@/views/user/login')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/user/reg')
const Forget = () =>
  import(/* webpackChunkName: 'forget' */ '@/views/user/forget')
const User = () => import(/* webpackChunkName: 'forget' */ '@/views/user/user')
const Hot = () => import(/* webpackChunkName: 'hot' */ '@/views/hot')
const Msg = () => import(/* webpackChunkName: 'msg' */ '@/views/msg')
// 修改密码
const Passwd = () =>
  import(/* webpackChunkName: 'passwd' */ '@/views/user/passwd')
// 修改个人设置
const Settings = () =>
  import(/* webpackChunkName: 'settings' */ '@/views/user/settings')
// 我的帖子
const MyPost = () =>
  import(/* webpackChunkName: 'mypost' */ '@/views/user/mypost')
// 我的收藏
const MyFav = () => import(/* webpackChunkName: 'myfav' */ '@/views/user/myfav')
// 签到
const Sign = () => import(/* webpackChunkName: 'sign' */ '@/views/user/sign')
// 个人主页
const Center = () =>
  import(/* webpackChunkName: 'center' */ '@/views/user/center')
// 404页面
const NotFound = () => import(/* webpackChunkName: '404' */ '@/views/404')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Home,
    name: 'home',
    // 修改为默认路由
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Catalog,
        props: true,
        // 用index来判断左滑还是右滑，
        // 如果index: 0(级数) > index: 1 (级数), 向子页面走，左滑
        // < 则右滑
        // === 切换，没有滑动
        // 无index，切换
        meta: { index: 0 }
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Catalog,
        props: true,
        meta: { index: 0 }
      }
    ]
  },
  // 详情页
  {
    path: '/detail',
    name: 'detail',
    props: true,
    component: Detail,
    meta: { index: 1 }
  },
  // 登入
  {
    path: '/login',
    name: 'login',
    props: true,
    component: Login,
    meta: { index: 1 }
  },
  // 修改设置
  {
    path: '/passwd',
    name: 'passwd',
    component: Passwd,
    meta: { requireAuth: true, index: 1 }
  },
  // 修改设置
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { requireAuth: true, index: 1 }
  },
  // 我的帖子
  {
    path: '/mypost',
    name: 'mypost',
    component: MyPost,
    meta: { requireAuth: true, index: 1 }
  },
  // 我的收藏
  {
    path: '/myfav',
    name: 'myfav',
    component: MyFav,
    meta: { requireAuth: true, index: 1 }
  },
  // 签到
  {
    path: '/sign',
    name: 'sign',
    component: Sign,
    meta: { requireAuth: true, index: 1 }
  },
  // 个人主页
  {
    path: '/center',
    name: 'center',
    component: Center,
    meta: { requireAuth: true, index: 1 }
  },
  // 注册
  {
    path: '/reg',
    name: 'reg',
    props: true,
    component: Reg,
    meta: { index: 1 }
  },
  // 忘记密码
  {
    path: '/forget',
    name: 'forget',
    props: true,
    component: Forget,
    meta: { requireAuth: true, index: 2 }
  },
  // 我的
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: { index: 0 }
  },
  // 热门
  {
    path: '/hot/:type',
    name: 'hot',
    component: Hot,
    props: true
  },
  // 消息
  {
    path: '/msg/:type',
    name: 'msg',
    component: Msg,
    props: true
  },
  // 404
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  // 所有没有获得到的路由全部进入*
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes,
  // 精确匹配，写在这儿的好处是，其他地方也能用了，只要是router-link就行
  linkExactActiveClass: 'active'
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    // atob解密的过程
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取localStorage里面缓存的token信息 + 用户信息
      // 8-24小时， refresh token 1个月
      store.commit('user/' + SET_TOKEN, token)
      store.commit('user/' + SET_USER, userInfo)
      store.commit('user/' + SET_ISLOGIN, true)
      if (!store.state.ws) {
        store.commit(INIT_WEBSOCKET, {})
      }
    } else {
      localStorage.clear()
    }
  }
  // console.log(to)
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const isLogin = store.state.user.isLogin
    // 已经登入
    if (isLogin) {
      next()
    } else {
      // 未登入的情况
      MessageBox.confirm('您还未登入, 需要登入吗?')
        .then((action) => {
          next({ path: '/login' })
        })
        .catch((cancel) => {})
    }
  } else {
    // 公共页面，不需登入
    next()
  }
})
export default router

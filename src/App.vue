<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { forbidScroll } from '@/utils/forbidScroll'
export default {
  // 模拟登入
  mounted() {
    const _this = this
    window.forbidScroll = forbidScroll
    this._submit()
    // 去识别是宽屏还是竖屏
    // window.addEventListener(
    //   'onorientationchange' in window ? 'orientationchange' : 'resize',
    //   function() {
    //     if (window.orientation === 180 || window.orientation === 0) {
    //       _this.$Toast('竖屏状态！')
    //     }
    //     if (window.orientation === 90 || window.orientation === -90) {
    //       _this.$Toast('请使用竖屏进行浏览！')
    //     }
    //   }
    // )
  },
  methods: {
    _submit() {
      login({
        username: '646380243@qq.com',
        password: '1234567',
        code: '3Bq9',
        sid: '123456789sa'
      }).then((res) => {
        if (res.code === 200) {
          // 存储用户的登入名以备后续更改
          console.log(res)
          res.data.username = this.username
          this.$store.commit('setUserInfo', res.data)
          this.$store.commit('setIsLogin', true)
          this.$store.commit('setToken', res.token)
          this.username = ''
          this.password = ''
          this.code = ''
          requestAnimationFrame(() => {})
          // 清空表单
          this.$refs.observer.reset() // 整个表单进行重置的操作
          this.$router.push({ name: 'index' })
          console.log(res)
        } else if ((res.code = 401)) {
          // 验证错误为服务器传回来的错误,后面必需以数组的方式
          // this.$refs.codefield.setErrors([res.msg])
        }
      })
      // .catch((err) => {
      //   const data = err.response.data
      //   if (data.code === 500) {
      //     this.$alert('用户名和密码验证失败了，请检查噢~')
      //   } else {
      //     this.$alert('服务器错误')
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
// 当手机屏幕宽度超过 $break-super: 480px, 横屏浏览时候的样式
@media (min-width: $break-super) and (orientation: landscape) {
  html::before {
    width: 100%;
    height: 100%;
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    content: '';
    background: #333;
  }
  body:before {
    background-image: url('./assets/images/orientation.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: 50%;
    content: '';
    height: 200px;
    width: 100px;
    z-index: 99999;
    margin: -140px 0 0 -50px;
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
  }
  body:after {
    content: '\4e3a\4e86\66f4\597d\7684\4f53\9a8c\ff0c\8bf7\5c06\624b\673a\7ad6\8fc7\6765';
    position: absolute;
    top: 50%;
    text-align: center;
    height: 30px;
    left: 0;
    font-size: 18px;
    z-index: 99999;
    width: 100%;
    color: #fff;
    margin-top: 35px;
  }
}

.inline-block {
  display: inline-block;
}
.flex-row {
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
}
.mint-header {
  height: 50px;
}
img {
  vertical-align: middle;
}
pre {
  position: relative;
  margin: 0;
  padding: 0 15px;
  line-height: 36px;
  background: #f2f2f2;
  color: #333;
  font-family: 'Courier New', Courier, monospace, serif;
  font-size: 24px;
  border: none;
  border-left: 5px solid #ddd;
}
</style>

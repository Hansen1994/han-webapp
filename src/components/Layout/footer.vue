<template>
  <div>
    <ul class="layout-footer" ref="footer">
      <!-- exact-active-class="active" 为点击后样式变成active的 -->
      <!-- active-class="active" 这里还得设置下，不然虽然是子路由，但还是会消失 -->
      <!-- active-class 比如首页是/index，那么包含首页右/index的路由都会被激活，而在router.js 里面写有exact的是精确路由 -->
      <router-link
        v-for="(tab, index) in tabs"
        :key="'tabs' + index"
        :to="tab.path"
        class="item"
        active-class="active"
      >
        <svg-icon :icon="tab.icon" :class="['svg-icon-' + tab.icon]"></svg-icon>
        <p>{{ tab.name }}</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'my-footer',
  data() {
    return {
      tabs: [
        { name: '首页', icon: 'home', path: '/index' },
        { name: '消息', icon: 'msg', path: '/msg/reply' },
        { name: '热门', icon: 'type', path: '/hot/post' },
        { name: '我的', icon: 'person', path: '/user' }
      ]
    }
  },
  mounted() {
    const elem = this.$refs.footer
    // 禁止滚动出现黑边
    window.forbidScroll(elem)
  }
}
</script>

<style lang="scss" scoped>
@import './footer.scss';
</style>

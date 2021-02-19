<template>
  <div>
    <ul class="layout-footer" ref="footer">
      <!-- exact-active-class="active" 为点击后样式变成active的 -->
      <router-link
        v-for="(tab, index) in tabs"
        :key="'tabs' + index"
        :to="tab.path"
        class="item"
        exact-active-class="active"
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
        { name: '首页', icon: 'home', path: '/' },
        { name: '消息', icon: 'msg', path: '/msg' },
        { name: '热门', icon: 'type', path: '/category' },
        { name: '我的', icon: 'person', path: '/center' }
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

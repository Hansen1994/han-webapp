<template>
  <div>
    <!-- footerHeight 是为了动态显示加载的距离 -->
    <scroll
      :distance="footerHeight"
      :isEnd="isEnd"
      @on-loadTop="loadTop"
      @on-loadBottom="loadBottom"
    >
      <ul>
        <list-item
          :key="'catalog' + index"
          v-for="(item, index) in lists"
          :item="item"
          @on-show-user="goUser"
          @on-show-detail="goDetail"
        >
        </list-item>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { getList } from '@/api/content'
export default {
  // 这是路由定义的
  props: ['catalog'],
  data() {
    return {
      page: 0,
      limit: 20,
      lists: [],
      isEnd: false, // 判断是否为末尾页
      isRepeat: false, // 避免重复请求接口
      handle: {},
      footerHeight: 0
    }
  },
  watch: {
    catalog(newval, oldval) {
      this.catalog = newval
      // 切换导航时候，page为0
      this.page = 0
      this.init()
    }
  },
  mounted() {
    this._getList()

    this.footerHeight = document.getElementsByClassName(
      'layout-footer'
    )[0].offsetHeight
    console.log(this.footerHeight)
  },
  methods: {
    init() {
      // 这个就是就是上拉加载，下拉刷新时候去掉文字，以便初始化
      if (typeof this.handle === 'function') {
        this.handle()
      }
      this.isEnd = false
      this.isRepeat = false
      this.lists = []
      this._getList()
    },
    loadTop(end) {
      this.page = 0
      // this._getList(end)
      this.handle = end
      this.init()
    },
    loadBottom(end) {
      this.page++
      // this._getList(end)
      this.handle = end
      this.init()
    },
    _getList(fn) {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      getList({
        catalog: this.catalog,
        page: this.page,
        limit: this.limit,
        sort: 'created'
      })
        .then((res) => {
          // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
          this.isRepeat = false
          // 对于异常的判断，res.code 非200，我们给用户一个提示
          // 判断是否lists长度为0，如果为零即可以直接赋值
          // 当Lists长度不为0，后面请求的数据，加入到Lists里面来
          if (res.code === 200) {
            // 判断res.data的长度，如果小于20条，则是最后页, 然后给isEnd = true
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.lists.length === 0) {
              this.lists = res.data
            } else {
              this.lists = tihs.lists.concat(res.data)
            }
          }
        })
        .catch((err) => {
          this.isRepeat = false
          if (err) {
            this.$Toast(err.message)
          }
        })
    },
    goUser(id) {
      console.log('userid', id)
    },
    goDetail(tid) {
      console.log('帖子id', tid)
      this.$router.push({ name: 'detail', params: { tid } })
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
  background-color: #f3f6f8;
}
</style>

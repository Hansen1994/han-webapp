<template>
  <div>
    <my-header
      :title="page.title || '页面详情'"
      :hasBack="true"
      :zIndex="1000"
    ></my-header>
    <div class="wrapper">
      <div class="detail-head">{{ page.title }}</div>
      <div class="detail-info">
        <div class="detail-info-head">
          <div class="avatar">
            <img :src="page.uid && page.uid.pic" alt />
          </div>
          <div class="cont">
            <p class="name">{{ page.uid && page.uid.name }}</p>
            <p class="time">{{ page.created | moment }}</p>
          </div>
        </div>
        <div class="detail-info-body" v-richtext="page.content"></div>
        <div class="detail-info-foot">{{ page.reads }} 阅读</div>
      </div>
      <div class="comments">
        <div class="title">评论</div>
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="30"
          class="comments-lists"
        >
          <li
            class="item"
            v-for="(item, index) in comments"
            :key="'comments-' + index"
          >
            <div class="detail-info-head">
              <div class="user">
                <div class="avatar">
                  <img :src="item.cuid && item.cuid.pic" alt="" />
                </div>
                <div class="cont">
                  <p class="name">{{ item.cuid && item.cuid.name }}</p>
                  <p class="time">{{ item.created | moment }}·评论了该帖子</p>
                </div>
              </div>
              <div class="hands" @click="test()">
                <svg-icon icon="zan"></svg-icon>
                <span>{{ item.hands }}</span>
              </div>
            </div>
            <div class="detail-body" v-richtext="item.content"></div>
          </li>
        </ul>
        <div class="info" v-if="comments.length === 0">
          暂时无评论，赶紧来抢沙发椅子吧~
        </div>
        <div class="loading" v-if="loading">
          <mt-spinner type="fading-circle"></mt-spinner>加载中
        </div>
        <div class="info" v-if="isEnd">没有更多了~~~</div>
      </div>
    </div>
    <!-- <div>{{comments}}</div> -->
    <div
      class="detail-bottom"
      :class="{ fixed: isFocus || faceStatus, on: faceStatus }"
    >
      <span class="bottom-input-wrap">
        <svg-icon icon="advice"></svg-icon>
        <input
          class="input"
          type="text"
          placeholder="写评论..."
          @focus="focus()"
          @blur="blur()"
        />
        <span @click.stop="showFace()">
          <svg-icon icon="smile" class="face"></svg-icon>
        </span>
      </span>
      <ul class="bottom-right">
        <li :class="{ row: !showText }">
          <svg-icon icon="bianji"></svg-icon>
          <p>
            <span v-show="showText">评论</span>
            {{ page.answer }}
          </p>
        </li>
        <li :class="{ row: !showText }">
          <svg-icon icon="shoucang"></svg-icon>
          <p>
            <span v-show="showText">{{
              page.isFav ? '取消收藏' : '收藏'
            }}</span>
          </p>
        </li>
        <li :class="{ row: !showText }">
          <svg-icon icon="zan"></svg-icon>
          <p>
            <span v-show="showText">赞</span>
            {{ page.fav }}
          </p>
        </li>
      </ul>
    </div>
    <div class="detail-face" :class="{ on: faceStatus }" ref="faces">
      <ul>
        <li
          class="detail-face-item"
          v-for="(value, key) in faces"
          :key="'face-' + key"
        >
          <img :src="value" alt />
        </li>
        <li class="clear"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import faces from '@/assets/js/face'
import { getDetail } from '@/api/content'
import { getComments } from '@/api/comments'
export default {
  name: 'detail',
  // 用于接收其他页传来的id
  props: ['tid'],
  data() {
    return {
      faces: faces,
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      },
      showText: true, // 底部是否显示文本
      loading: false,
      isEnd: false,
      isFocus: false,
      faceStatus: false,
      scroll: null
    }
  },
  mounted() {
    this.getPostDetail()
    // this.getCommentsList()
    const wrap = this.$refs.faces
    const faceHander = (evt) => {
      if (!wrap.contains(evt.target) && this.faceStatus) {
        this.faceStatus = false
      }
    }
    document.removeEventListener('touchstart', faceHander)
    document.addEventListener('touchstart', faceHander)
  },
  watch: {
    faceStatus(newval, oldval) {
      if (!newval) {
        this.scroll.scrollTo(0, 0)
      }
    }
  },
  methods: {
    showFace() {
      this.faceStatus = !this.faceStatus
      if (this.faceStatus) {
        this.scroll = new BScroll(this.$$refs.faces)
      }
    },

    // 文本框焦点事件
    focus() {
      this.isFocus = true
    },
    // 文本框失去焦点事件
    blur() {
      this.isFocus = false
    },
    // mint下拉加载更多
    loadMore() {
      if (this.isEnd) return
      this.loading = true
      this.getCommentsList()
    },
    // 获取文章详情
    getPostDetail() {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    // 获取评论详情
    getCommentsList() {
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then((res) => {
        this.loading = false
        if (res.code === 200) {
          // 判断res.data的长度，如果小于10条，则是最后页
          if (res.data.length < this.size) {
            this.isEnd = true
          }
          if (this.comments.length === 0) {
            this.comments = res.data
          } else {
            this.comments = this.comments.concat(res.data)
          }
        }
        // 当前页加载完再当前页+1
        this.current++
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './detail.scss';
</style>

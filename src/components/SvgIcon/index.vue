<template>
  <!--  aria-hidden="true" 是为了能让能听力好的人，盲人阅读 -->
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="symbolName" />
  </svg>
</template>

<script>
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
// console.log(req)
// let map = {
//   "./advice.svg": "./src/assets/icons/svg/advice.svg",
// 	"./arrow-down.svg": "./src/assets/icons/svg/arrow-down.svg",
// 	"./arrow-left.svg": "./src/assets/icons/svg/arrow-left.svg",
// 	"./arrow-right.svg": "./src/assets/icons/svg/arrow-right.svg",
//   "./bianji.svg": "./src/assets/icons/svg/bianji.svg",
//   ...
// }
// console.log(req)
const requireAll = (requireContent) => {
  // console.log(requireContent)
  // 这是下面这行的详细写法，还记得[1,2,3].map(parseInt)么，hh
  return requireContent.keys().map((item, index) => {
    return requireContent(item)
  })
  // return requireContent.keys().map(requireContent)
}
requireAll(req)
export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      required: true // 必须
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    symbolName() {
      return `#icon-${this.icon}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

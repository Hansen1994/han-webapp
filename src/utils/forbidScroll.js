// 处理微信黑边问题
export const forbidScroll = (elem) => {
  let flag = false

  elem.addEventListener(
    'touchstart',
    (evt) => {
      // 判断evt.target是否为elem的后代元素
      if (elem.contains(evt.target)) {
        flag = true
      } else {
        flag = false
      }
    },
    false
  )
  elem.addEventListener('touchmove', (evt) => {
    evt.prop = flag
  })
}
// 神奇
const handler = (evt) => {
  if (evt.prop) {
    evt.preventDefault()
  }
}
// passive: false不要取监听冒泡或者捕获事件
document.body.removeEventListener('touchmove', handler, { passive: false })
document.body.addEventListener('touchmove', handler, { passive: false })

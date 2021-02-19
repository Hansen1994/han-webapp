const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    // 先清除已经有的所有的loader
    // 如果不在么做，接下来的loader会附加在该规则现有的的loader之后
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('./src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 避免不是上面这个目录下的svg不能编译的问题
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('./src/assets/icons')) // 排除icons目录
  },
  css: {
    loaderOptions: {
      sass: {
        // 这里的选项会传递给sass-loader
        prependData: '@import "@/assets/styles/_variables.scss";'
      }
    }
  }
}

// 打包发布vue组件到npm参考：
// https://www.cnblogs.com/angia/p/17483276.html
// https://blog.csdn.net/qq_43322436/article/details/130805129?ops_request_misc=&request_id=&biz_id=102&utm_term=%E5%8F%91%E5%B8%83vue%20%E7%BB%84%E4%BB%B6%E5%88%B0npm&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-130805129.142^v99^pc_search_result_base6&spm=1018.2226.3001.4187

const path = require('path')
const { defineConfig } = require('@vue/cli-service')
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: { 
    resolve: {
      alias: { // 别名配置
        '@': resolve('examples'), // src改为了examples
        '~': resolve('packages')
      }
    }
  },
  // 强制内联CSS（使用组件时，不需要再引入css）
  css: {
    extract: false
  },
  pages: {
    index: {
      entry: 'examples/main.js',// 因为我们改了src目录，所以对应的入口文件配置也要做修改
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  // 扩展webpack配置，使packages加入编译
  // 通过chainWebpack对于项目进行配置，使用babel处理：将高版本语法转成低版本语法
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('js')
  //     .include.add(path.resolve(__dirname, 'packages'))
  //     .end()
  //     .use('babel')
  //     .loader('babel-loader')
  //     .tap((option) => {
  //       // 修改选项
  //       return option
  //     })
  // }
})

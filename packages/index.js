// 导入单个组件
import ganttVue2 from './components/ganttVue2/index.vue'

// 以数组的结构保存组件，便于遍历
const components = [
  ganttVue2
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  install.installed = true
  // 遍历并注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 对于那些没有在应用中使用模块化系统的用户，他们往往将通过 <script> 标签引用你的插件，并期待插件无需调用 Vue.use() 便会自动安装 。
// 你可以在插件最后添加如下几行代码来实现自动安装：
// 判断是否是直接引入文件，如果Vue是全局对象自动安装插件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 组件列表
  ...components
}
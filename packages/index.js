// 导入单个组件
import ganttChartVue from './components/ganttChartVue/index.vue'
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    install.installed = true
    Vue.component(ganttChartVue.name, ganttChartVue)
}

export default ganttChartVue
export {
    install
}

/**
 * Copyright (c) 2023 重庆隆志科技有限公司. All rights reserved.
 * author: yangfeng
 * blog: https://www.jianshu.com/u/71a7345bdabf
 * date: 2024/01/08
 * remark: 如果要分发gantt-chart-vue源码，需在本文件顶部保留此文件头信息！！
 */

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

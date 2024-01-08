# gantt-chart-vue 一个使用vue2.x开发的甘特图组件

## 目录说明
packages下是gantt-chart-vue 组件源码  
examples下是demo代码，根目录下执行 `npm run serve`启动项目  

## 支持vue2.x
## 功能
* 1.甘特图精度显示到“分钟”。
* 2.甘特图支持只读模式。
* 3.甘特图支持点击显示标记线，标记线多个甘特图联动，通过.sync 实现。
* 4.支持在甘特图中标记当前时间-时间线，前提是当前时间在任务开始结束区间内。
* 5.甘特图支持底部支持显示统计行。
* 6.甘特图支持是否开启甘特图高度自适应：  
    true：限定在父级设置的高度范围内，超出将显示纵向滚动条，如果父容器未设置高度，将以初始渲染的高度为准，后续都限定在此高度范围内。  
    false：甘特图自动撑开，特别注意父容器不要设置高度！！！
* 7.甘特图支持右键菜单，通过rightClickMenuList属性配置。
* 8.甘特图支持给左侧任务列配置右键菜单，通过taskMenuList属性配置。  
    任务列菜单 - 每行的菜单都一样，若想给某行单独设置不同的菜单，则给row 对应行赋值 taskMenuList
* 9.每行任务支持同时显示多种类型的tag，可拖动tag到其他行列，不同类型tag将在不同行显示。
* 10.拖动tag时tag左侧显示时间线。
* 11.支持给任务行设置是否禁用，禁用行可设置是否响应事件【不响应则不可拖入禁用行】，可通过disabledRowSilent属性控制是否开启。
* 12.tag tooltip 采用 el-popover实现, 默认显示tag的tooltip、支持单个tag的tip关闭、使用插槽父组件可自行修改tag tooltip内容。  
  tip 显示的优先级为：当前tag 设置的closeTip > 当前tag对应legend设置的closeTip > 都没设置则默认显示tip。
* 13.tag支持右键菜单，tag 右键菜单功能，菜单在legend中配置，点击菜单按钮抛出参数。
* 14.想要时间更精确，当tag拖动，结束后可以弹窗选择起止时间，可通过dragTagEndShowTimeDialog控制是否开启此功能。
* 15.tag 支持点击显示选中效果tag selected为true即可，可以全局关闭，提供获取所有选中项，清空所有选中项api。
* 16.tag 前可以显示自定义图标，就是个类名放到tag前的 `<i>` 标签里面，推荐使用iconfont。
* 17.甘特图支持实现任务持续时间加减n天显示，tag拖动到有滚动条边界时时滚动条滚动。
* 18.甘特图支持tag拖动时，后面tag的避让效果。  
    特别注意：拖动结束后需要重新触发甘特图init方法才会清除避让信息！这部分是垃圾数据，只是为了有个避让效果，和甘特图本身数据无关

## 注意
甘特图tag是以左上角点位置判断拖到的哪行。

## 效果图
![图1](./packages/imgs/img1.png)
![图2](./packages/imgs/img2.png)
![动态图](./packages/imgs/gif.gif)

## 安装
npm i gantt-chart-vue -S

## 引入
### 方式一，main.js中全局引入
```js
import Vue from 'vue'
import App from './App.vue'

// vue插件方式引入
import * as ganttChartVue from 'gantt-chart-vue'
Vue.use(ganttChartVue)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')

```
### 方式二
```js
import ganttChartVue from 'gantt-chart-vue'

export default {
  ...
  components: {
        ganttChartVue
  }
  ...
}
```
### 基础使用代码
``` vue
<template>
  <div>
  <!-- 默认值测试 -->
  <gantt-chart-vue ref="ganTT1" v-bind="ganTT1Option" />
  </div>
</template>

<script>
import ganttChartVue from 'gantt-chart-vue'
export default {
  components: {
        ganttChartVue
    },
  data(){
    return {
      ganTT1Option: {
                readOnly: false, // 只读模式
                title: '甘特图',
                legend: [
                    {
                        label: '模型预排',
                        color: '#365ce5',
                        type: 1, // 用于判定同一网格行内具体所属行
                        dragable: true, // 此类型tag是否可以拖动，也可以在rows中配置单个tag是否可以拖动
                        closeTip: false, // 显示tag tip，也可以在rows中配置单个tag是否关闭提示
                        btnList: [ // 右键菜单按钮列表
                            {
                                label: '开启tag选中',
                                disabled: false
                            },
                            {
                                label: '关闭tag选中',
                                disabled: false
                            },
                            {
                                label: 'tag前添加图标',
                                disabled: false
                            }
                        ]
                    },
                    {
                        label: '生产实绩',
                        color: '#39c236',
                        type: 2, // 用于判定同一网格行内具体所属行
                    },
                    {
                        label: '计划停机1',
                        color: '#f5212d',
                        type: 3, // 用于判定同一网格行内具体所属行
                        closeTip: true // 关闭此大类的tag tip，若tag自行设置有closeTip，则以tag 内的为准
                    },
                    {
                        label: '计划停机2',
                        color: '#ff9c1b',
                        type: 4 // 用于判定同一网格行内具体所属行
                    }
                ],
                rows: [
                    {
                        label: '项目A',
                        tags: [
                            {
                                startTime: '2023/12/01 02:10:00',
                                endTime: '2023/12/03 06:10:00',
                                label: '关闭此类型tip-1',
                                type: 3
                            },
                            {
                                startTime: '2023/12/01 02:10:00',
                                endTime: '2023/12/03 06:10:00',
                                label: '计划停机2,完成度90%',
                                type: 4
                            },
                            {
                                startTime: '2023/12/03 08:00:00',
                                endTime: '2023/12/05 10:10:00',
                                label: '关闭此类型tip-2',
                                type: 3
                            },
                            {
                                startTime: '2023/12/06 02:10:00',
                                endTime: '2023/12/07 06:00:00',
                                label: 'tag右键菜单展示demo',
                                type: 1
                            },
                        ]
                    },
                    {
                        label: '项目B',
                        tags: [
                            {
                                startTime: '2023/12/06 02:10:00',
                                endTime: '2023/12/07 06:10:00',
                                label: '模型预排1111,xx吨,完成度90%',
                                type: 1
                            },
                        ]
                    },
                    {
                        label: '项目C',
                        tags: []
                    },
                    {
                        label: '项目D',
                        tags: [
                            {
                                startTime: '2023/12/01 02:10:00',
                                endTime: '2023/12/03 06:10:00',
                                label: 'xxxx,xx吨,完成度90%',
                                type: 1
                            },
                        ]
                    },
                    {
                        label: '项目E',
                        tags: []
                    },
                    {
                        label: '项目F',
                        tags: []
                    },
                    {
                        label: '项目G',
                        disabled: true, // 禁止响应事件
                        tags: []
                    },
                    {
                        label: '项目H',
                        tags: []
                    },
                ],
                startDate: '2023/12/01',
                dateDuration: 7
            },
    }
  }
}
</script>
<style scoped>
</style>

```

# props 属性值介绍
## readOnly
boolean，是否只读，最高优先级，为true会禁用所有编辑功能，如拖拽，右键菜单等
## disabledRowSilent
boolean，禁用行是否不触发事件，tag不可拖动到禁用行，不触发右键菜单 true：禁止拖入 false：可以拖入。禁用行是根据rows中每个item的 disabled 属性判断的。
## showSelected
boolean，是否显示tag选中 - false 不会显示选中效果，true 显示选中效果【tag是否选中是通过rows中每个item的selected控制的】
![tag选中效果.gif](./examples/assets/tag选中效果.gif)

## selfAdaptionGanTTHeight
boolean，是否开启甘特图高度自适应：  
true：限定在父级设置的高度范围内，超出将显示纵向滚动条，如果父容器未设置高度，将以初始渲染的高度为准，后续都限定在此高度范围内  
false：甘特图自动撑开，特别注意父容器不要设置高度！！！  

## legend
类型为：
``` typescript
interface Ilegendtype{
  color: string; // 这种类型tag的背景色【tip：想要设置tag自己的样式请在rows对应项中设置tags的className修改】
  type: number; // 用于判定同一网格行内具体所属行
  dragable: boolean; // 此类型tag是否可以拖动，也可以在rows中配置单个tag是否可以拖动
  closeTip: boolean; // 此类型是否显示tag tip，也可以在rows中配置单个tag是否关闭提示
  btnList: { // tag上的右键菜单按钮列表
    label:string;
    disabled: boolean;
  }[]
}[]
```
甘特图的类型数组，用于控制每行tag的颜色以及行的顺序。完整值例子如：
```js
[
    {
    color: '#365ce5',
    type: 1, // 用于判定同一网格行内具体所属行
    dragable: true, // 此类型tag是否可以拖动，也可以在rows中配置单个tag是否可以拖动
    closeTip: false, // 显示tag tip，也可以在rows中配置单个tag是否关闭提示
    btnList: [ // 右键菜单按钮列表
        {
        label: '开启tag选中',
        disabled: false
        },
        {
        label: '关闭tag选中',
        disabled: false
        },
        {
        label: 'tag前添加图标',
        disabled: false
        }
        ]
    }
]
```

## title
string，甘特图标题，默认值：'甘特图'
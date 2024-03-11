## 使用vue2.x开发的一款甘特图-[详细文档地址](https://github.com/yangfeng727/gantt-chart-vue)

## 支持vue2.x、vue3.x
**注意：**  
针对markLineTime属性， vue2 使用 markLineTime.sync，vue3 使用 v-model:markLineTime。  

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
* 17.甘特图支持实现任务持续时间加减n天显示，tag拖动到有滚动条边界时滚动条滚动。
* 18.甘特图支持tag拖动时，后面tag的避让效果。  
    特别注意：拖动结束后需要重新触发甘特图init方法才会清除避让信息！这部分是垃圾数据，只是为了有个避让效果，和甘特图本身数据无关

## 效果图
![图1](https://github.com/yangfeng727/gantt-chart-vue/raw/main/packages/imgs/img1.png)
![图2](https://github.com/yangfeng727/gantt-chart-vue/raw/main/packages/imgs/img2.png)
![动态图](https://github.com/yangfeng727/gantt-chart-vue/raw/main/packages/imgs/gif.gif)

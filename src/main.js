import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式文件

import styles from './styles/index.less'

Vue.config.productionTip = false
// 创建vue根实例
// 把router配置到跟实例中
// 通过render方法吧App跟组件渲染到app人口节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 加载全局样式文件

import styles from './styles/index.less'


// 全局注册element组件库
Vue.use(ElementUI);

Vue.config.productionTip = false
// 创建vue根实例
// 把router配置到跟实例中
// 通过render方法吧App跟组件渲染到app人口节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


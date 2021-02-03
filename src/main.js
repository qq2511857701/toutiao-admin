import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 加载全局样式文件

import styles from './styles/index.less'

// import JSONbig from 'json-bigint'
// 使用json本身转换的话number会不准确
// let str = '{"id", 12345649453132}'
// 如果想用他转成原来的数值 那么

// console.log(JSON.parse(str));
// JSON.parse()
// JSONbig.stringify()


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


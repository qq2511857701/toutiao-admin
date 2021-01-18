// 封装一个基于axios封装请求
import axios from 'axios'
// 创建一个axios实例 就是赋值一个axios
// 我们通过这个实例去发送请求，把需要的配置给这个实例来执行
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/'//请求的基础路径
})
// 请求拦截器

// 响应拦截器
// 抛出请求方法
export default request
// 谁要使用就加载request模块

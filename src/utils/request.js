// 封装一个基于axios封装请求
import axios from 'axios'
// import JSONbig from 'json-bigint'
// 创建一个axios实例 就是赋值一个axios
// 我们通过这个实例去发送请求，把需要的配置给这个实例来执行
const request = axios.create({
    baseURL:'http://api-toutiao-web.itheima.net/',//请求的基础路径
    // / 定义后端返回的原始数据的处理
    // axios本身返回来的数据会进行json处理  那么我们可以在这的时候精确处理数据 用jsonbig
    // 定义后端返回来的原始数据处理  默认是json
    // 参数 data就是后端返回的未处理原始数据json.parse
    // transformResponse: [function (data) {
    //   // 后端返回的可能不是json格式的 如果不是的话就会报错  所以使用try捕获异常 
    //   try{
    //     // 如果转换成功 num就会成一个对象  我们用的时候要tostring转过来
    //     return JSONbig.parse(data)
    //   }catch (err) {
    //     // 如果失败 进入这里 原封不动的使用
    //     return data
    //   }

      
    // }

    // ]
})
// 请求拦截器
axios.interceptors.request.use(function (config) {
  let user = JSON.parse(window.localStorage.getItem('user'))
  console.log(user);
  //  如果有登录用户的信息
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
  }
  // 然后我们可以再请求出去之前统一业务处理功能
  // 例如 设置统一的token
  // 当在这里 return config 才会被发送出去
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });
// 响应拦截器
// 抛出请求方法
export default request
// 谁要使用就加载request模块

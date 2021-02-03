// 用户登录相关模块

import request from "../utils/request"
const api_name = 'mp/v1_0'
export default {
    // 用户登录
    getLogin(data){
        return request({
            method:'POST',
            url:`${api_name}/authorizations`,
            // 请求体data
            data
        
     })
    },
    // 获取用户信息
    getUserProfile(data){
        const user = JSON.parse(window.localStorage.getItem('user'))
        console.log(user);
        return request({
            methods:'GET',
            url:`${api_name}/user/profile`,
            headers: {
            Authorization: `Bearer ${user.token}`,  
            },
            // 请求体data
            data,
     }) 
}

}

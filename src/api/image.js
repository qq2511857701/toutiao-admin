// 素材请求相关模块
import request from '@/utils/request'
const api_name = 'mp/v1_0'
// 上传图片素材
export const uploadImage =  (data) =>{
        const user = JSON.parse(window.localStorage.getItem('user'))
    return request({
            method: 'POST',
            url:`${api_name}/user/images`,
            headers: {
                Authorization: `Bearer ${user.token}`,  
                },
            // 一般上传文件的接口都要求吧请求头中的content-type设置为 multipart/form-data
            // 使用axios传文件的话不需要手动设置 只要给data一个formdata对象即可 new formdata
            data
    })
    }
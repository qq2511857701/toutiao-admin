// 文章相关请求文件
import request from '@/utils/request'
const api_name = 'mp/v1_0'


export default {
    // 获取文章列表
    // getArticle (page,per_page,status,channel_id,begin_pubdate,end_pubdate){
    getArticle (params){
        console.log(params);
        const user = JSON.parse(window.localStorage.getItem('user'))
        console.log(user);
        return request({
            method: 'GET',
            // url: `${api_name}/articles?page=${page}&per_page=${per_page}&status=${status}&channel_id=${channel_id}&begin_pubdate=${begin_pubdate}&end_pubdate=${end_pubdate}`,
            url: `${api_name}/articles`,
            params,
            headers: {
                Authorization: `Bearer ${user.token}`,  
            },
            // params
            // Body 参数使用data设置
            // Queru参数使用params 设置
            // Headers 参数 使用headers设置
        })
    },
    // 获取文章频道
    getArticleChannels ( ){
        return request({
            method: 'GET',
            url: `${api_name}/channels`,
            // headers: {
            //     Authorization: `Bearer ${user.token}`,  
            // },
            // params
            // Body 参数使用data设置
            // Queru参数使用params 设置
            // Headers 参数 使用headers设置
        })
    },
    // 删除文章
    getdelete (id){
        return request({
            // 凡是看见文档接口中参数需要在 :xxx 格式的就需要传递id
            method: 'GET',
            url: `${api_name}/articles/${id}`,
        })
    }
}
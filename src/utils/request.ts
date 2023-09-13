import axios from 'axios'
import { ElMessage } from 'element-plus'
//引入用户相关的仓库
import useUserStore from '@/store/user'
//利用axios.create方法创建一个axios实例：可以设置基础路径，超出时间的设置
const request = axios.create({
    baseURL:'/api',//请求基础路径
    timeout:5000//超时的时间
})

//请求拦截器
request.interceptors.request.use((config)=>{
    //获取用户仓库
    let useStore=useUserStore()
    //token是公共参数,如果用户登录了需要携带
    if(useStore.userInfo.token){
        config.headers.token=useStore.userInfo.token
    }
    //config:请求拦截器回调注入的对象（配置对象），配置对象的身上最终要的一件事情headers属性
    //可以通过请求头携带公共参数-token
    return config
})
//响应拦截器
request.interceptors.response.use((response)=>{
    //响应拦截器成功的回调。一般会进行简化数据
    return response.data
},(error)=>{
    //处理http网络错误、
    let status = error.response.status
    switch (status){
        case 404:
            ElMessage({
                type:'error',
                message:error.message
            })
            break
        case 500|501|502|503|504|505:
            ElMessage({
                type:'error',
                message:error.message
            })
            break
    }
    return Promise.reject(new Error(error.message))
})

export default request
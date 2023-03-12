import axios ,{AxiosHeaders} from 'axios';
import store from '../redux';
import {message} from 'antd';
axios.defaults.baseURL = 'http://106.12.150.223:8090/api/private/v1/';
axios.defaults.timeout = 10000;

//请求拦截
axios.interceptors.request.use((config:any)=>{
    //设置请求头
    // let token = localStorage.getItem('token')
    let token = store.getState().userReducer.token
    config.headers.Authorization = token
    return config
})

//响应拦截
axios.interceptors.response.use((res:any)=>{
    if(res.data.meta.status === 401 || res.data.meta.status === 400){
        window.location.href = '#/login'
        message.error(res.data.meta.msg)
        return
    }
    if(res.data.meta.status !== 200 && res.data.meta.status !== 201 && res.data.meta.status !== 204){
        message.error(res.data.meta.msg)
        return 
    }
    return res
})

let http = (url:string,method:string,data:DataParams={},headers?:AxiosHeaders) =>{
    return axios({
        url,
        method,
        params:method==='get'?data:null,
        data:method!=='get'?data:null,
        headers
    })
}

export default http;
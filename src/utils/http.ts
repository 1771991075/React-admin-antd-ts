import axios ,{AxiosHeaders} from 'axios';
axios.defaults.baseURL = 'http://106.12.150.223:8090/api/private/v1/';
axios.defaults.timeout = 10000;

//请求拦截
axios.interceptors.request.use((config:any)=>{
    //设置请求头
    let token = localStorage.getItem('token')
    config.headers.Authorization = token
    return config
})

//响应拦截
axios.interceptors.response.use((res:any)=>{
    if(res.data.meta.status === 401){
        window.location.href = '/login'
    }
    return res
})

let http = (url:string,method:string,data:DataParams={},headers?:AxiosHeaders) =>{
    return axios({
        url,
        method,
        data,
        headers
    })
}

export default http;
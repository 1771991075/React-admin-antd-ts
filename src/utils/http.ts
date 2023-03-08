import axios ,{AxiosHeaders} from 'axios';
axios.defaults.baseURL = 'http://106.12.150.223:8090/api/private/v1/';
axios.defaults.timeout = 10000;

let http = (url:string,method:string,data:DataParams={},headers?:AxiosHeaders) =>{
    return axios({
        url,
        method,
        data,
        headers
    })
}

export default http;
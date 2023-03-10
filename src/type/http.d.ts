interface DataParams {
    [key:string]:any
}

interface ResData {
    data:any,
    meta:{
        msg:string,
        status:number
    }
}

interface ResponsType {
    config:object,
    data:ResData,
    headers:object,
    request:object,
    status:number,
    statusText:string
}
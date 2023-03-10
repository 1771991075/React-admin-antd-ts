import { useEffect } from "react";
//引入进度条插件
import Nprogress from 'nprogress';
//引入插件样式
import 'nprogress/nprogress.css';

export default function Loading() {

  useEffect(()=>{
    //显示进度条
    Nprogress.start()
    return ()=>{
      //隐藏进度条
      Nprogress.done()
    }
  },[])
  return <></>
}

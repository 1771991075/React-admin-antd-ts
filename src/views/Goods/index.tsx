import { Input, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { getGoodsList } from '../../api/goods';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

export default function Goods() {
  //当前页码
  let [pagenum,setPagenum] = useState(1)
  //每页显示条数
  let [pagesize,setPagesize]= useState(5)

  useEffect(()=>{
    let data = {
      pagenum,
      pagesize
    }
    getGoodsList(data).then(res=>{
      console.log(res);
    })
  })

  return (
    <div>
      <div>
        <Search placeholder="请输入内容" onSearch={onSearch} style={{ width: 300 }} />
        <Button type="primary" style={{ marginLeft: '20px' }}>添加商品</Button>
      </div>
    </div>
  )
}

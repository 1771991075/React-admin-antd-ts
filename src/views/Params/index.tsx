import { Button, Alert, Cascader, Tabs, message } from 'antd';
import { useState, useEffect } from 'react';
import { getGoodsCateList } from '../../api/goods';
import type { TabsProps } from 'antd';
import TableList from './component/TableList';

export default function Params() {
  //商品分类列表
  let [options, setOpinons] = useState<GetgoodsCate[]>([]);
  //当前选中的分类id列表
  let [cate_id, setCate_id] = useState<number[]>([])

  //选择分类列表
  let onChange = (value: number[]) => {
    console.log(value)
    if (value.length < 3) {
      message.warning("请选择三级分类！！！")
      setCate_id([]);
      return
    }
    setCate_id(value)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `动态参数`,
      children: <TableList sel='many' cate_ids={cate_id}></TableList>,
    },
    {
      key: '2',
      label: `静态属性`,
      children: <TableList sel='only' cate_ids={cate_id}></TableList>,
    },
  ];
  //获取分类列表
  let getDateList = async () => {
    let res = await getGoodsCateList()
    setOpinons(res.data.data)
  }

  useEffect(() => {
    getDateList()
  }, [])

  return (
    <div>
      <Alert
        style={{ marginBottom: '20px', height: "40px" }}
        message="注意：只允许为三级分类设置相关参数！！！"
        type="warning"
        showIcon
        action={<Button size="small" type="text"></Button>}
        closable
      />
      <div>
        选择商品分类:&nbsp;<Cascader options={options} onChange={(value: number[] | any) => onChange(value)} placeholder="请选择商品分类" fieldNames={{ label: "cat_name", value: "cat_id", children: "children" }} value={cate_id} />
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

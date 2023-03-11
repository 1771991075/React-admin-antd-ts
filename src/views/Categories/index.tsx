import { Button, Alert, Cascader, Tag, Table } from 'antd';
import { useState, useEffect } from 'react';
import { getGoodsCateList } from '../../api/goods';
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Categories() {
  //表格内容
  let [goodsCate, setGoodsCate] = useState<GetgoodsCate[]>([])
  //表格表头
  const columns: ColumnsType<GetgoodsCate> = [
    {
      title: '#',
      dataIndex: 'cat_id',
      render: (text) => <a>{text}</a>,
      width:100
    },
    {
      title: '分类名称',
      dataIndex: 'cat_name',
    },
    {
      title: '是否有效',
      dataIndex: 'attr_name',
      render:()=>{
        return(
          <Tag color="success">有效</Tag>
        )
      }
    },
    {
      title: '排序',
      dataIndex: 'cat_level',
      render:()=>{
        return(
          <Tag color="purple">一级</Tag>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'actions',
      render: () => {
        return (
          <>
            <Button type='primary' icon={<FormOutlined />} size="small" style={{ marginRight: '10px' }}>编辑</Button>
            <Button type='primary' icon={<DeleteOutlined />} danger size="small">删除</Button>
          </>
        )
      }
    }
  ];
  //获取商品分类列表
  let getGoodsListF = async () => {
    let res = await getGoodsCateList()
    if (res.data.meta.status === 200) {
      setGoodsCate(res.data.data)
    }
  }
  useEffect(() => {
    getGoodsListF()
  },[])

  return (
    <div>
      <Button type='primary'>添加分类</Button>
      <Table
        rowKey={(record) => record.cat_id}
        style={{ marginTop: '20px' }}
        bordered
        columns={columns}
      // expandable={{
      //   expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
      //   rowExpandable: (record) => record.name !== 'Not Expandable',
      // }}
      dataSource={goodsCate}
      />
    </div>
  )
}

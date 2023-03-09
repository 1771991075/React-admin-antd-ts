import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getRightsList } from '../../api/roles';

const columns: ColumnsType<RightsDataType> = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '权限名称',
    dataIndex: 'authName',
    key: 'authName',
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '权限等级',
    key: 'level',
    dataIndex: 'level',
    render: (_, record) => (
      <Tag color={record.level==='0'?'processing':record.level==='1'?'success':'warning'} key={record.id}>{record.level==='0'?'一级':record.level==='1'?'二级':'三级'}</Tag>
    ),
  }
];

export default function Rights() {
  //权限列表
  let [rightsList,setRightList] = useState([])

  useEffect(() => {
    getRightsList().then((res:any)=>{
      setRightList(res.data.data)
    })
  },[])

  return (
    <div>
      <Table scroll={{ x: 1000 }} bordered={true} columns={columns} dataSource={rightsList} rowKey={(record)=>record.id} />
    </div>
  )
}

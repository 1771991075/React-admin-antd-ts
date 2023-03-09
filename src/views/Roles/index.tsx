import { Button, Table,Space } from 'antd';
import { FormOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useEffect,useState } from 'react';
import { getRolesList } from '../../api/roles';

const columns: ColumnsType<RolesDataType> = [
  { title: '角色ID', dataIndex: 'id', key: 'id' },
  { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
  { title: '角色描述', dataIndex: 'roleDesc', key: 'roleDesc' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" size='small' icon={<FormOutlined />} onClick={() => {console.log(record)}}>编辑</Button>
        <Button size='small' type="primary" danger icon={<DeleteOutlined />} onClick={() => {}}>删除</Button>
        <Button type="primary" size='small' icon={<SettingOutlined />}>分配权限</Button>
      </Space>
    )
  },
];

export default function Roles() {
  //角色列表
  let [data,setDate] = useState()

  useEffect(() => {
    getRolesList().then(res => {
      console.log(res);
      setDate(res.data.data)
    })
  }, [])

  return (
    <div className="roles">
      <div>
        <Button type="primary">添加角色</Button>
      </div>
      <Table
        columns={columns}
        rowKey={(record)=>record.id}
        expandable={{
          // expandedRowRender: (record) => <p style={{ margin: 0 }}><div></div></p>,
          // rowExpandable: (record) => record.roleName !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </div>
  )
}

import { Space, Switch, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';


let usersListTabel = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 100
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 180
    },
    {
      title: '角色',
      dataIndex: 'role_name',
      key: 'role_name',
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'mg_state',
      key: 'mg_state',
      width: 100,
      render: (record) => <Switch defaultChecked onChange={() => { }} key={record.key} />
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" key={record.key}>
          <Button type="primary" size='small' icon={<FormOutlined />}>编辑</Button>
          <Button size='small' type="primary" danger icon={<DeleteOutlined />}>删除</Button>
          <Button type="primary" size='small' icon={<SettingOutlined />}>分配角色</Button>
        </Space>
      ),
    },
  ];

  return columns
}

export default usersListTabel;
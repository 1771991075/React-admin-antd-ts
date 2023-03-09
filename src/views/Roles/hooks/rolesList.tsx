import { FormOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Button,Space } from 'antd';

let rolesListHook = (showDelModal:any) =>{
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
              <Button type="primary" size='small' icon={<FormOutlined />}>编辑</Button>
              <Button size='small' type="primary" danger icon={<DeleteOutlined />} onClick={()=>showDelModal(record.id)}>删除</Button>
              <Button type="primary" size='small' icon={<SettingOutlined />}>分配权限</Button>
            </Space>
          )
        },
      ];
      return columns;
}

export default rolesListHook;
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space,Button} from 'antd';
import type { ColumnsType } from 'antd/es/table';

let goodsListHook = () => {
    const columns: ColumnsType<goodsListType> = [
        { title: '#', dataIndex: 'id', key: 'id' },
        { title: '商品名称', dataIndex: 'roleName', key: 'roleName' },
        { title: '商品价格', dataIndex: 'roleDesc', key: 'roleDesc' },
        { title: '商品重量', dataIndex: 'roleDesc', key: 'roleDesc' },
        { title: '创建时间', dataIndex: 'roleDesc', key: 'roleDesc' },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" size='small' icon={<FormOutlined />}>编辑</Button>
                    <Button size='small' type="primary" danger icon={<DeleteOutlined />} >删除</Button>
                </Space>
            )
        },
    ];
    return columns;
}

export default goodsListHook
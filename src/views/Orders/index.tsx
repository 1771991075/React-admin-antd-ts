import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Select, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, SettingOutlined } from '@ant-design/icons';
const { Search } = Input;
export default function Orders() {

  //搜索框改变
  const onSearch = (value: string) => console.log(value);
  //支付状态
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  //表格表头
  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'index',
      width:30
    },
    {
      title: '订单编号',
      dataIndex: 'age',
    },
    {
      title: '订单价格',
      dataIndex: 'address',
    },
    {
      title: '是否付款',
      dataIndex: 'address',
    },
    {
      title: '是否发货',
      dataIndex: 'address',
      render() {
        return (
          <Tag color={'blue'}>银行卡</Tag>
        )
      }
    },
    {
      title: '下单时间',
      dataIndex: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='primary' icon={<FormOutlined/>}>修改订单状态</Button>
          <Button type='primary' icon={<SettingOutlined/>}>物流信息</Button>
          <Button type='primary' icon={<SettingOutlined/>}>订单详情</Button>
        </>
      ),
    },
  ];
  //表格数据
  const data: DataType[] = []

  return (
    <div>
      <div>
        <Search placeholder="请输入内容" onSearch={onSearch} style={{ width: 300 }} />&nbsp;&nbsp;
        <span>支付状态:</span>&nbsp;&nbsp;
        <Select
          placeholder='选择支付...'
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
          ]}
        />&nbsp;&nbsp;
        <span>是否发货:</span>&nbsp;&nbsp;
        <Select
          placeholder='请选择'
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
          ]}
        />
      </div>
      <div style={{marginTop:'20px'}}>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    </div>
  )
}

import { Input, Select, Table, Tag, Button ,Pagination} from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, SettingOutlined } from '@ant-design/icons';
import { getOrderList } from '../../api/orders';
import { useEffect, useState } from 'react';
const { Search } = Input;
export default function Orders() {
  //表格数据
  let [data, setData] = useState<OrderInfoType[]>([])
  //页码
  let [pagenum, setPagenum] = useState<number>(1)
  //每页展示数量
  let [pagesize, setPagesize] = useState<number>(5)
  //总共条数
  let [total, setTotal] = useState(0)
  //搜索的内容
  let [query, setQuery] = useState<string>('')
  //搜索框改变
  const onSearch = (value: string) => setQuery(value);
  //支付状态
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  //表格表头
  const columns: ColumnsType<OrderInfoType> = [
    {
      title: '#',
      dataIndex: 'index',
      width: 30
    },
    {
      title: '订单编号',
      dataIndex: 'order_number',
    },
    {
      title: '订单价格',
      dataIndex: 'order_price',
    },
    {
      title: '是否付款',
      dataIndex: 'order_pay',
    },
    {
      title: '是否发货',
      dataIndex: 'is_send',
      render() {
        return (
          <Tag color={'blue'}>银行卡</Tag>
        )
      }
    },
    {
      title: '下单时间',
      dataIndex: 'create_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='primary' size='small' icon={<FormOutlined />}>修改订单状态</Button>&nbsp;
          <Button type='primary' size='small' icon={<SettingOutlined />}>物流信息</Button>&nbsp;
          <Button type='primary' size='small' icon={<SettingOutlined />}>订单详情</Button>
        </>
      ),
    },
  ];
  //点击切换页码
  let onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPagenum(page)
    setPagesize(pageSize)
  };

  //获取订单列表
  let getOrder = async () => {
    let data = {
      pagenum,
      pagesize,
      query
    }
    let res = await getOrderList(data)
    if (res.data.meta.status === 200) {
      setData(res.data.data.goods)
      setTotal(res.data.data.total)
    }
  }

  useEffect(() => {
    getOrder()
  },[pagenum,pagesize,query])

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
      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={data} bordered rowKey={(record): any => record.order_id} pagination={false} />
        <Pagination showQuickJumper defaultPageSize={pagesize} current={pagenum} total={total} pageSizeOptions={[5, 10, 20, 50]} onChange={onChange} showSizeChanger style={{ marginTop: '20px' }} />
      </div>
    </div>
  )
}

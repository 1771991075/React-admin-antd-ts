import { Input, Select, Table, Tag, Button, Pagination, Modal, Form, Radio, message, Timeline } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, SettingOutlined } from '@ant-design/icons';
import { getOrderList, updateOrder, getTimer } from '../../api/orders';
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
  //支付方式
  let [paystatus, setPaystatus] = useState<string>('')
  //是否发货
  let [isSend, setIsSend] = useState<string>('')
  //当前选中的订单项
  let [record, setRecord] = useState<OrderInfoType | null>(null)
  //选中订单项的发货状态和支付方式
  let [nowSend, setNowSend] = useState('0')
  let [nowPay, setNowPay] = useState('0')
  //当前选中的订单项物流信息
  let [nowTimer, setNowTimer] = useState()
  //物流信息模态框
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const showTimeModal = () => {
    setIsTimeModalOpen(true);
  };
  const handleTimeOk = () => {
    setIsTimeModalOpen(false);
  };
  const handleTimeCancel = () => {
    setIsTimeModalOpen(false);
  };
  //修改订单模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  };
  //表单提交
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    if (record) {
      let data = {
        is_send: values.is_send,
        order_pay: values.order_pay,
        order_price: record.order_price,
        order_number: values.order_number,
        pay_status: record.pay_status
      }
      let res = await updateOrder(record.order_id, data)
      if (res.data.meta.status === 201) {
        message.success(res.data.meta.msg)
        getOrder()
        handleOk()
        return
      }
      message.error(res.data.meta.msg)
    }
  };
  //搜索框改变
  const onSearch = (e: any) => {
    setQuery(e.target.value)
  };
  //支付状态
  const changePayStatus = (value: string) => {
    setPaystatus(value)
  };
  //是否发货
  const changeIsSend = (value: string) => {
    setIsSend(value)
  }
  //表格表头
  const columns: ColumnsType<OrderInfoType> = [
    {
      title: '#',
      dataIndex: 'index',
      width: 30,
      render(text: any, record: any, index: number) {
        return (
          <div>{index + 1}</div>
        )
      },
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
      render(_, record: OrderInfoType) {
        return (
          <Tag color={record.order_pay === '0' ? "red" : "green"}>
            {record.order_pay === '0' ? "未支付" : record.order_pay === '1' ? "支付宝" : record.order_pay === '2' ? "微信" : "银行卡"}
          </Tag>
        )
      }
    },
    {
      title: '是否发货',
      dataIndex: 'is_send',
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
          <Button type='primary' size='small' icon={<FormOutlined />} onClick={() => {
            form.setFieldsValue({
              order_price: record.order_price,
              order_number: record.order_number,
              is_send: record.is_send === '是' ? "1" : '0',
              order_pay: record.order_pay
            })
            setRecord(record)
            setNowSend(record.is_send === '是' ? "1" : '0')
            setNowPay(record.order_pay)
            showModal()
          }}>修改订单状态</Button>&nbsp;
          <Button type='primary' size='small' icon={<SettingOutlined />} onClick={async () => {
            // let res = await getTimer(record.order_id)
            // if(res.data.meta.status === 200){
            //   let Items:any = []
            //   res.data.data.forEach((item:TimerType)=>{
            //     let obj = {
            //       label:item.time,
            //       children:item.context
            //     }
            //     Items.push(obj)
            //   })
            //   setNowTimer(Items)
            //   showTimeModal()
            // }
            showTimeModal()
          }}>物流信息</Button>&nbsp;
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
      query,
      pay_status: paystatus,
      is_send: isSend
    }
    let res = await getOrderList(data)
    if (res.data.meta.status === 200) {
      setData(res.data.data.goods)
      setTotal(res.data.data.total)
    }
  }

  useEffect(() => {
    getOrder()
  }, [pagenum, pagesize, query, isSend, paystatus])

  return (
    <div>
      <div>
        <Search placeholder="请输入内容" value={query} onChange={(e: any) => onSearch(e)} style={{ width: 300 }} />&nbsp;&nbsp;
        <span>支付状态:</span>&nbsp;&nbsp;
        <Select
          placeholder='选择支付...'
          style={{ width: 120 }}
          onChange={changePayStatus}
          options={[
            { value: '', label: '全部' },
            { value: '0', label: '未支付' },
            { value: '1', label: '支付宝' },
            { value: '2', label: '微信' },
            { value: '3', label: '银行卡' },
          ]}
        />&nbsp;&nbsp;
        <span>是否发货:</span>&nbsp;&nbsp;
        <Select
          placeholder='请选择'
          style={{ width: 120 }}
          onChange={changeIsSend}
          options={[
            { value: '', label: '全部' },
            { value: '1', label: '已发货' },
            { value: '0', label: '未发货' },
          ]}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={data} bordered rowKey={(record): any => record.order_id} pagination={false} />
        <Pagination showQuickJumper defaultPageSize={pagesize} current={pagenum} total={total} pageSizeOptions={[5, 10, 20, 50]} onChange={onChange} showSizeChanger style={{ marginTop: '20px' }} />
      </div>
      <Modal title="修改订单信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="订单价格"
            name="order_price"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="订单数量"
            name="order_number"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="是否发货"
            name="is_send"
          >
            <Radio.Group onChange={(e) => setNowSend(e.target.value)} value={nowSend}>
              <Radio value={'0'}>未发货</Radio>
              <Radio value={'1'}>已发货</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="订单状态"
            name="order_pay"
          >
            <Radio.Group onChange={(e) => setNowPay(e.target.value)} value={nowPay}>
              <Radio value={'0'}>未支付</Radio>
              <Radio value={'1'}>支付宝</Radio>
              <Radio value={'2'}>微信</Radio>
              <Radio value={'3'}>银行卡</Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel}>
              取消
            </Button>&nbsp;
            <Button type="primary" htmlType="submit">
              确认修改
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal title="物流信息" open={isTimeModalOpen} onOk={handleTimeOk} onCancel={handleTimeCancel}>
        <Timeline
          style={{ marginTop: '20px' }}
          mode={'right'}
          items={[
            {
              "label": "2018-05-10 09:39:00",
              "children": "已签收,感谢使用顺丰,期待再次为您服务",
            },
            {
              "label": "2018-05-10 08:23:00",
              "children": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
            },
            {
              "label": "2018-05-10 07:32:00",
              "children": "快件到达 [北京海淀育新小区营业点]",
            },
            {
              "label": "2018-05-10 02:03:00",
              "children": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
            },
            {
              "label": "2018-05-09 23:05:00",
              "children": "快件到达 [北京顺义集散中心]",
            },
            {
              "label": "2018-05-09 21:21:00",
              "children": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
            },
            {
              "label": "2018-05-09 13:07:00",
              "children": "顺丰速运 已收取快件",
            },
            {
              "label": "2018-05-09 12:25:03",
              "children": "卖家发货",
            },
            {
              "label": "2018-05-09 12:22:24",
              "children": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
            },
            {
              "label": "2018-05-08 21:36:04",
              "children": "商品已经下单",
            }
          ]}
        />
      </Modal>
    </div>
  )
}

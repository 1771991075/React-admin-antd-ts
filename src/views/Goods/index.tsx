import { Input, Space, Button, Table, Pagination, Modal, message} from 'antd';
import { useEffect, useState } from 'react';
import { FormOutlined, DeleteOutlined ,ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { getGoodsList ,deleteGoods } from '../../api/goods';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
export default function Goods() {
  let navigate = useNavigate()
  //商品列表
  let [goodsList, setGoodsList] = useState<TableGoodsType[]>([])
  //单个商品属性
  let [record, setRecord] = useState<TableGoodsType | null>(null)
  //当前页码
  let [pagenum, setPagenum] = useState(1)
  //每页显示条数
  let [pagesize, setPagesize] = useState(5)
  //列表总数
  let [total, steTotal] = useState(0)
  //搜索关键字
  let [query, setQuery] = useState('')
  //解构提示框
  const [messageApi, contextHolder1] = message.useMessage();
  //商品列表数据
  const columns: ColumnsType<TableGoodsType> = [
    { title: '#', dataIndex: 'goods_id' },
    { title: '商品名称', dataIndex: 'goods_name', width: 600 },
    { title: '商品价格', dataIndex: 'goods_price' },
    { title: '商品重量', dataIndex: 'goods_weight' },
    { title: '创建时间', dataIndex: 'add_time' },
    {
      title: '操作',
      dataIndex: '',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" size='small' icon={<FormOutlined />} onClick={() => {
            setRecord(record)
          }}>编辑</Button>
          <Button size='small' type="primary" danger icon={<DeleteOutlined />} onClick={() => {
            confirm(record.goods_id)
          }}>删除</Button>
        </Space>
      )
    },
  ];
  //模态框状态
  const [modal, contextHolder] = Modal.useModal();
  const confirm = (id:number) => {
    modal.confirm({
      title: '注意',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除当前商品吗？',
      okText: '确认',
      cancelText: '取消',
      //删除商品
      onOk: async()=>{
        console.log(id);
        let res = await deleteGoods(id)
        if(res.data.meta.status === 200){
          message.success(res.data.meta.msg)
          getGoods()
          return
        }
        message.error(res.data.meta.msg)
      }
    });
  };
  //获取商品列表
  let getGoods = async () => {
    let data = {
      pagenum,
      pagesize,
      query
    }
    let res = await getGoodsList(data)
    //处理数据
    let newData: TableGoodsType[] = [];
    res.data.data.goods.forEach((item: TableGoodsType) => {
      let obj = {
        goods_id: item.goods_id,
        goods_name: item.goods_name,
        goods_price: item.goods_price,
        goods_weight: item.goods_weight,
        add_time: item.add_time,
      }
      newData.push(obj)
    })
    setGoodsList(newData)
    steTotal(res.data.data.total)
  }
  //点击切换页码
  let onChange: PaginationProps['onChange'] = (page: number, pageSize: number) => {
    setPagenum(page)
    setPagesize(pageSize)
  };

  useEffect(() => {
    getGoods()
  }, [pagenum, pagesize, query])

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Search placeholder="请输入内容" onChange={(e) => setQuery(e.target.value)} style={{ width: 300 }} />
        <Button type="primary" style={{ marginLeft: '20px' }} onClick={() => navigate('/index/addgoods')}>添加商品</Button>
      </div>
      <div>
        <Table columns={columns} dataSource={goodsList} rowKey={(record) => record.goods_id} bordered pagination={false} />
        <Pagination showQuickJumper defaultPageSize={pagesize} current={pagenum} total={total} pageSizeOptions={[5, 10, 20, 50]} onChange={onChange} showSizeChanger style={{ marginTop: '20px' }} />
      </div>
      {contextHolder}
      {contextHolder1}
    </div>
  )
}

import { Button, Tag, Table, Modal, Form, Input, message, Cascader } from 'antd';
import { useState, useEffect } from 'react';
import { getGoodsCateList, setCate, updateCate ,delCate} from '../../api/goods';
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';

export default function Categories() {

  //表格内容
  let [goodsCate, setGoodsCate] = useState<GetgoodsCate[]>([])
  //当前选中的行对象
  let [record, setRecord] = useState<GetgoodsCate | null>(null)
  //当前选中的分类id
  let [nowId, setNowId] = useState<number>(0)
  //添加模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  //三级分类
  let [options, setoptions] = useState([]);
  const [form] = Form.useForm();
  let onChange = (value: any) => {
    setNowId(value[value.length - 1])
  }

  //添加、修改完成
  const onFinish = async (values: any) => {
    if (record) {
      let data = {
        cat_name: values.cat_name,
      }
      let res = await updateCate(record.cat_id, data)
      if (res.data.meta.status === 200) {
        message.success(res.data.meta.msg)
        handleOk()
        getGoodsListF();
        return
      }
      message.error(res.data.meta.msg)
    } else {
      let data = {
        cat_name: values.cat_name,
        cat_level: 0,
        cat_pid: nowId,
      }
      if (values.cat_id.length !== 0) {
        data.cat_level = values.cat_id.length
      }
      let res = await setCate(data)
      if (res.data.meta.status === 201) {
        message.success(res.data.meta.msg)
        setNowId(0)
        handleOk()
        getGoodsListF();
        return
      }
      message.error(res.data.meta.msg)
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setRecord(null)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.setFieldsValue({
      cat_name: ''
    })
    setRecord(null)
    setIsModalOpen(false);
  };
  //删除弹出框
  const { confirm } = Modal;
  const showConfirm = (id:number) => {
    confirm({
      title: '注意',
      icon: <ExclamationCircleFilled />,
      content: '您确定要删除当前分类吗?',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        delCate(id).then(res=>{
          if(res.data.meta.status === 200){
            message.success(res.data.meta.msg)
            getGoodsListF()
          }else{
            message.error(res.data.meta.msg)
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  //表格表头
  const columns: ColumnsType<GetgoodsCate> = [
    {
      title: '#',
      dataIndex: '1',
      render: (text) => <a>{text}</a>,
      width: 100
    },
    {
      title: '分类名称',
      dataIndex: 'cat_name',
    },
    {
      title: '是否有效',
      dataIndex: 'attr_name',
      render: () => {
        return (
          <Tag color="success">有效</Tag>
        )
      }
    },
    {
      title: '排序',
      dataIndex: 'cat_level',
      render: (_, record) => {
        return (
          <Tag color={record.cat_level === 0 ? "purple" : record.cat_level === 1 ? "blue" : 'cyan'}>{record.cat_level === 0 ? "一级" : record.cat_level === 1 ? "二级" : '三级'}</Tag>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'actions',
      render: (_, record: GetgoodsCate) => {
        return (
          <>
            <Button type='primary' icon={<FormOutlined />} size="small" style={{ marginRight: '10px' }} onClick={() => {
              form.setFieldsValue({
                cat_name: record.cat_name
              })
              setRecord(record)
              showModal()
            }}>编辑</Button>
            <Button type='primary' icon={<DeleteOutlined />} danger size="small" onClick={() => {
              showConfirm(record.cat_id)
            }}>删除</Button>
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
  //获取三级分类
  let getCate = async () => {
    let res: any = await getGoodsCateList()
    setoptions(res.data.data)
  }

  useEffect(() => {
    getGoodsListF();
    getCate();
  }, [])

  return (
    <div>
      <Button type='primary' onClick={showModal}>添加分类</Button>
      <Table
        rowKey={(record) => record.cat_id}
        style={{ marginTop: '20px' }}
        bordered
        columns={columns}
        dataSource={goodsCate}
      />
      <Modal title={record ? '编辑分类' : '添加分类'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="分类名称"
            name="cat_name"
            rules={[{ required: true, message: '请输入分类名称!' }]}
          >
            <Input />
          </Form.Item>

          {
            !record && <Form.Item
              label="商品分类"
              name="cat_id"
            >
              <Cascader options={options} changeOnSelect onChange={onChange} placeholder="请选择商品分类" fieldNames={{ label: "cat_name", value: "cat_id", children: "children" }} />
            </Form.Item>
          }

          <div style={{ textAlign: 'right' }}>
            <Button>
              取消
            </Button>&nbsp;
            <Button type="primary" htmlType="submit">
              {record ? '确认修改' : '确定添加'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

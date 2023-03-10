import { Button, Table, Modal, Form, Input, message, Space } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { getRolesList, setRoles, delRoles, changeRoles, getRights } from '../../api/roles';
import { FormOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RowRender from './component/RowRender';
import SetRights from './component/set-rights';

export default function Roles() {
  const columns: ColumnsType<RolesDataType> = [
    { title: '角色ID', dataIndex: 'id' },
    { title: '角色名称', dataIndex: 'roleName' },
    { title: '角色描述', dataIndex: 'roleDesc' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (_, record: RolesTableItem) => (
        <Space size="middle">
          <Button type="primary" size='small' icon={<FormOutlined />} onClick={() => { showModal(record) }}>编辑</Button>
          <Button size='small' type="primary" danger icon={<DeleteOutlined />} onClick={() => showDelModal(record.id)}>删除</Button>
          <Button type="primary" size='small' icon={<SettingOutlined />} onClick={() => {
            setRightsRef.current.init(rigthsList, record.list, record.id);
          }}>分配权限</Button>
        </Space>
      )
    },
  ];
  let setRightsRef: { current: any } = useRef();
  //  权限列表
  let [rigthsList, setRightsList] = useState<RightsType[]>([]);
  //全局提示
  const [messageApi, contextHolder] = message.useMessage();
  //角色列表
  let [data, setDate] = useState([])
  const [form] = Form.useForm();
  //定义加载状态
  let [loading, setLoading] = useState(false);
  //当前选中的角色
  let [record, setRecord] = useState<RolesDataType | null>(null)
  //当前选中的角色id
  let [rolesId, setRolesId] = useState(0)
  //添加角色模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  //删除用户模态框
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  //打开模态框
  const showModal = (record?: RolesDataType) => {
    setIsModalOpen(true)
    //如果有角色对象，编辑
    if (record) {
      setRecord(record)
      form.setFieldsValue({
        roleName: record.roleName,
        roleDesc: record.roleDesc
      })
    } else {
      //没有角色对象就添加
      setRecord(null)
    }
  };
  const handleOk = () => {
    //提交表单
    form.submit()
  };
  //关闭模态框
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  };
  //表单成功回调
  const onFinish = async (values: RolesFormType) => {
    if (record) {
      let ress = await changeRoles(record.id, values)
      if (ress.data.meta.status === 200) {
        messageApi.success(ress.data.meta.msg)
        form.resetFields()
        setIsModalOpen(false)
        getRolesList1()
        return
      }
      messageApi.error(ress.data.meta.msg)
    } else {
      let res = await setRoles(values)
      if (res.data.meta.status === 201) {
        messageApi.success(res.data.meta.msg)
        form.resetFields()
        setIsModalOpen(false);
        getRolesList1()
        return
      }
      messageApi.error(res.data.meta.msg)
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    messageApi.error(errorInfo.errorFields[0].errors)
  };
  //删除用户模态框
  const showDelModal = (id: number) => {
    setRolesId(id)
    setIsDelModalOpen(true);
  };
  const handleDelOk = () => {
    delRole(rolesId)
    setIsDelModalOpen(false);
  };
  const handleDelCancel = () => {
    setIsDelModalOpen(false);
  };
  //删除用户
  let delRole = async (id: number) => {
    let res = await delRoles(id)
    if (res.data.meta.status === 200) {
      messageApi.success(res.data.meta.msg)
      let idx = data.findIndex((item: RolesDataType): boolean => {
        return item.id === id
      })
      if (idx !== -1) {
        let newState = JSON.parse(JSON.stringify(data))
        newState.splice(idx, 1)
        setDate(newState)
      }
      return
    }
    messageApi.error(res.data.meta.msg)
  }
  //获取所有角色列表
  let getRolesList1 = async () => {
    setLoading(true)
    let res = await getRolesList()
    setDate(res.data.data)
    setLoading(false)
    //使用三重for循环 修改每个chlidren属性名
    res.data.data.forEach((item: any) => {
      item.list = item.children
      delete item.children
      item.list.forEach((two: any) => {
        two.list = two.children
        delete two.children
        two.list.forEach((three: any) => {
          three.list = three.children
          delete three.children
        })
      })
    })
  }
  // 获取所有权限列表
  let getRightsList = async () => {
    let res: any = await getRights('tree');
    setRightsList(res.data.data)
  }

  useEffect(() => {
    getRolesList1();
    getRightsList();
  }, [])

  return (
    <div className="roles">
      {contextHolder}
      <Button type="primary" onClick={() => showModal()}>添加角色</Button>
      <Table
        bordered={true}
        style={{ marginTop: '20px' }}
        rowKey={'id'}
        scroll={{ x: 900 }}
        columns={columns}
        loading={loading}
        expandedRowRender={(record: RolesTableItem) => {
          return <RowRender record={record} over={(res: ResponsType) => {
            if (res.data.meta.status === 200) {
              getRolesList1()
            }
          }}></RowRender>
        }}
        dataSource={data}
      />
      <Modal title={record ? '编辑角色' : "添加角色"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={record ? "确认修改" : '确认添加'} cancelText={'取消'}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色描述"
            name="roleDesc"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="注意" open={isDelModalOpen} onOk={handleDelOk} onCancel={handleDelCancel} okText={'确认删除'} cancelText={'取消'}>
        <p>您确定要删除当前角色吗?</p>
      </Modal>
      <SetRights ref={setRightsRef} rigthsList={rigthsList} over={(res: ResponsType) => {
        if (res.data.meta.status === 200) {
          messageApi.success(res.data.meta.msg)
          getRolesList1();
        }
      }}></SetRights>
    </div>
  )
}


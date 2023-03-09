import { Button, Table, Modal, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { getRolesList, setRoles,delRoles } from '../../api/roles';
import rolesListHook from './hooks/rolesList';

export default function Roles() {
  //角色列表
  let [data, setDate] = useState([])
  const [form] = Form.useForm();
  //当前选中的角色id
  let [rolesId,setRolesId] = useState(0)
  //添加角色模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  //删除用户模态框
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  //打开模态框
  const showModal = () => { setIsModalOpen(true) };
  const handleOk = () => {
    //提交表单
    form.submit()
  };
  //关闭模态框
  const handleCancel = () => { setIsModalOpen(false) };
  //表单成功回调
  const onFinish = async (values: RolesFormType) => {
    let res = await setRoles(values)
    if (res.data.meta.status === 201) {
      success(res.data.meta.msg)
      setIsModalOpen(false);
    }
    error(res.data.meta.msg)
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    error(errorInfo.errorFields[0].errors)
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
  //自定义hook
  let columns = rolesListHook(showDelModal)
  //删除用户
  let delRole = async (id: number) => {
    let res = await delRoles(id)
    if (res.data.meta.status === 200) {
      success(res.data.meta.msg)
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
    error(res.data.meta.msg)
  }

  //全局提示
  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };
  const warning = (msg: string) => {
    messageApi.open({
      type: 'warning',
      content: msg,
    });
  }

  useEffect(() => {
    getRolesList().then(res => {
      console.log(res);
      setDate(res.data.data)
    })
  }, [])

  return (
    <div className="roles">
      {contextHolder}
      <Button type="primary" onClick={showModal}>添加角色</Button>
      <Table
        bordered={true}
        style={{ marginTop: '20px' }}
        rowKey={(record): any => record.id}
        scroll={{ x: 900 }}
        columns={columns}
        expandable={{
          // expandedRowRender: (record) => <p style={{ margin: 0 }}><div></div></p>,
          // rowExpandable: (record) => record.roleName !== 'Not Expandable',
        }}
        dataSource={data}
      />
      <Modal title="添加角色" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'确认添加'} cancelText={'取消'}>
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
    </div>
  )
}


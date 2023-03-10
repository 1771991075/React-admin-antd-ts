import { Input, Button, Modal, Table, Pagination, Form, message, Space, Switch } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect, useRef } from 'react';
import { getUserList, setUsers, delUsers, updateUserState ,updateUsers } from '../../api/user';
import { FormOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import DealUser from './component/DealUser';
import './index.css';
const { Search } = Input;
export default function Users() {
    const columns: ColumnsType<DataType> = [
        {
            title: '用户ID',
            dataIndex: 'id',
            width: 100
        },
        {
            title: '用户名',
            dataIndex: 'username',
            width: 150
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'mobile',
        },
        {
            title: '角色',
            dataIndex: 'role_name',
        },
        {
            title: '状态',
            dataIndex: 'mg_state',
            render(text: boolean, record: DataType) {
                return (
                    <Switch checked={text} onChange={async (value) => {
                        let res: ResponsType = await updateUserState(record.id, value)
                        if (res.data.meta.status === 200) {
                            messageApi.success(res.data.meta.msg)
                            getDataList()
                        }else{
                            messageApi.error(res.data.meta.msg)
                        }
                    }} />
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 300,
            render: (_, record: DataType) => (
                <Space size="middle" >
                    <Button type="primary" size='small' icon={<FormOutlined />} onClick={() => showChangeUserModal(record)}>编辑</Button>
                    <Button size='small' type="primary" danger icon={<DeleteOutlined />} onClick={() => showDelModal(record.id)}>删除</Button>
                    <Button type="primary" size='small' icon={<SettingOutlined/>} onClick={()=>dealRef.current.init(record) }>分配角色</Button>
                </Space>
            ),
        },
    ];
    //当前用户列表
    let [data, setData] = useState([])
    //总共条数
    let [total, setTotal] = useState(0)
    //当前页数和当前每页数量
    let [page, setPage] = useState(1)
    let [pageSize, setPageSize] = useState(5)
    let [query, setQuery] = useState('')
    //添加用户表单实例
    const [form] = Form.useForm();
    //创建修改用户表单实例
    const changeForm:{current:any} = useRef();
    //创建分配权限模态框
    const dealRef:{current:any} = useRef();
    let [record,setRecord] = useState<DataType | null>(null);
    //添加用户模态框
    const [isModalOpen, setIsModalOpen] = useState(false);
    //修改用户模态框
    const [changeUserModalOpen, setChangeUserModalOpen] = useState(false);
    //删除用户模态框
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    let [delUserId, setDelUserId] = useState(0)
    //点击显示添加用户模态框
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { form.submit() };
    const handleCancel = () => { 
        form.resetFields()
        setIsModalOpen(false) 
    };
    //解构提示框
    const [messageApi, contextHolder] = message.useMessage();
    //点击显示修改用户模态框
    const showChangeUserModal =(record:DataType) => {
        setRecord(record)
        setChangeUserModalOpen(true)
    };
    //点击确认修改的回调
    const handleChangeUserOk = () => {
        //提交修改表单
        changeForm.current.submit()
    };
    //修改成功之后的回调
    const onUpdate = async (values: UpdateUserType) => {
        if(record){
            let res = await updateUsers(record.id,values)
            messageApi.success(res.data.meta.msg)
            setChangeUserModalOpen(false);
            getDataList()
        }
    };
    //点击取消修改的回调
    const handleChangeUserCancel = () => {
        changeForm.current.resetFields()
        setChangeUserModalOpen(false);
    };
    //发送请求添加用户
    const setUser = async (data: SetUsersType) => {
        let res = await setUsers(data)
        if (res.data.meta.status === 201) {
            messageApi.success(res.data.meta.msg)
            form.resetFields()
            setIsModalOpen(false);
            return
        }
        messageApi.error(res.data.meta.msg)
    }
    //提交成功之后的回调
    const onFinish = (values: any) => {
        setUser(values)
    };
    //提交失败后的回调
    const onFinishFailed = (errorInfo: any) => {
        messageApi.warning(errorInfo.errorFields[0].errors)
    };

    //删除用户模态框
    const showDelModal = (id: number) => {
        setDelUserId(id)
        setIsDelModalOpen(true);
    };
    const handleDelOk = () => {
        delUser(delUserId)
        setIsDelModalOpen(false);
    };
    const handleDelCancel = () => {
        setIsDelModalOpen(false);
    };
    //删除用户
    let delUser = async (id: number) => {
        let res = await delUsers(id)
        if (res.data.meta.status === 200) {
            messageApi.success(res.data.meta.msg)
            let idx = data.findIndex((item: DataType): boolean => {
                return item.id === id
            })
            if (idx !== -1) {
                let newState = JSON.parse(JSON.stringify(data))
                newState.splice(idx, 1)
                setData(newState)
            }
            return
        }
        messageApi.error(res.data.meta.msg)
    }
    //获取用户列表
    let getDataList = async () => {
        let data1: UsersListParams = {
            query,
            pagenum: page,
            pagesize: pageSize
        }
        let res: ResponsType = await getUserList(data1)
        setData(res.data.data.users)
        setTotal(res.data.data.total)
    }
    //点击切换页码
    let onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    };

    useEffect(() => {
        if(record){
            changeForm.current.setFieldsValue({
                username:record.username,
                email:record.email,
                mobile:record.mobile
            })
        }
        getDataList()
    }, [page, pageSize, query, record])

    return (
        <div className='users'>
            {contextHolder}
            <div className='users_search'>
                <Search placeholder="请输入内容" onChange={(e) => setQuery(e.target.value)} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: '15px' }} onClick={showModal} htmlType="submit">添加用户</Button>
                <Modal title="添加用户" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'确认添加'} cancelText={'取消'}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[{ required: true, message: '请输入邮箱!',type:'email' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="手机号"
                            name="mobile"
                            rules={[{ required: true,validator:(_,value:number | string)=>{
                                if(/^1[3456789]\d{9}$/.test(value as string)){
                                    return Promise.resolve()
                                }
                                return  Promise.reject("请输入正确手机号码")
                            }}]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <div className='users_tabel'>
                <Table columns={columns} dataSource={data} sticky={true} bordered={true} pagination={false} style={{ marginTop: '20px' }} rowKey={(record): any => record.id} scroll={{ x: 1200 }} />
                <Pagination showQuickJumper defaultPageSize={pageSize} current={page} total={total} pageSizeOptions={[5, 10, 20, 50]} onChange={onChange} showSizeChanger style={{ marginTop: '20px' }} />
            </div>
            <Modal title="修改信息" open={changeUserModalOpen} onOk={handleChangeUserOk} onCancel={handleChangeUserCancel} okText={'确认修改'} cancelText={'取消'}>
                <Form
                    ref={changeForm}
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onUpdate}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{ required: true, message: '请输入邮箱!', type:'email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="mobile"
                        rules={[{ required: true, message: '请输入手机号!',validator:(_,value:number | string)=>{
                            if(/^1[3456789]\d{9}$/.test(value as string)){
                                return Promise.resolve()
                            }
                            return  Promise.reject("请输入正确手机号码")
                        } }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="注意" open={isDelModalOpen} onOk={handleDelOk} onCancel={handleDelCancel} okText={'确认删除'} cancelText={'取消'}>
                <p>您确定要删除当前用户吗?</p>
            </Modal>
            <DealUser ref={dealRef} over={(res:ResponsType)=>{
                if(res.data.meta.status === 200){
                    messageApi.success(res.data.meta.msg)
                    getDataList()
                }
            }}/>
        </div>
    )
}

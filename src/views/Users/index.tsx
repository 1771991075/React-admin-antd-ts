import { Input, Button, Modal, Table, Pagination, Form ,message} from 'antd';
import type { PaginationProps } from 'antd';
import { useState, useEffect } from 'react';
import { getUserList, setUsers } from '../../api/user';
//引入自定义hooks
import usersListTabel from './hooks/usersList';
import './index.css';

const { Search } = Input;
export default function Users() {
    //当前用户列表
    let [data, setData] = useState([])
    let [data1, setData1] = useState([])
    //总共条数
    let [total, setTotal] = useState(0)
    //当前页数和当前每页数量
    let [page, setPage] = useState(1)
    let [pageSize, setPageSize] = useState(5)
    //添加用户模态框
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { form.submit() };
    //发送请求添加用户
    const setUser = async (data: SetUsersType) => {
        let res = await setUsers(data)
        if (res.data.meta.status === 201) {
            success(res.data.meta.msg)
            setIsModalOpen(false);
            return
        }
        error(res.data.meta.msg)
    }
    const handleCancel = () => { setIsModalOpen(false) };
    //添加用户
    const [form] = Form.useForm();
    //提交成功之后的回调
    const onFinish = (values: any) => {
        console.log('Success:', values);
        setUser(values)
    };
    //提交失败后的回调
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        warning(errorInfo.errorFields[0].errors)
    };

    const [messageApi, contextHolder] = message.useMessage();
    //提示框
    const success = (msg:string) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };
    const error = (msg:string) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };
    const warning = (msg:string) => {
        messageApi.open({
          type: 'warning',
          content: msg,
        });
    };

    //调用自定义hooks
    let columns = usersListTabel()
    //点击切换页码
    let onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    };
    //点击搜索用户
    const onSearch = (e: any) => {
        if (!e.target.value) {
            setData1(data)
        }
        let searchArr = data.filter((item: DataType) => {
            return item.username.includes(e.target.value)
        })
        setData1(searchArr)
    };

    useEffect(() => {
        getUserList(page, pageSize).then(res => {
            setData(res.data.data.users)
            setData1(res.data.data.users)
            setTotal(res.data.data.total)
        })
    }, [page, pageSize])

    return (
        <div className='users'>
            {contextHolder}
            <div className='users_search'>
                <Search placeholder="请输入内容" onChange={(e) => onSearch(e)} style={{ width: 300 }} />
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
                            rules={[{ required: true, message: '请输入邮箱!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="手机号"
                            name="mobile"
                            rules={[{ required: true, message: '请输入手机号!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <div className='users_tabel'>
                <Table columns={columns} dataSource={data1} sticky={true} bordered={true} pagination={false} style={{ marginTop: '20px' }} rowKey={(record): any => record.id} scroll={{ x: 1200 }} />
                <Pagination showQuickJumper defaultPageSize={pageSize} current={page} total={total} pageSizeOptions={[5, 10, 20, 50]} onChange={onChange} showSizeChanger={true} style={{ marginTop: '20px' }} />
            </div>
        </div>
    )
}

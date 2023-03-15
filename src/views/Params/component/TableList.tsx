import { Button, Table, Tag, Input, message, Modal, Form } from 'antd'
import { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, PlusOutlined ,ExclamationCircleFilled} from '@ant-design/icons';
import { getAttributesList, updateParams, setAttribute,delAttribute } from '../../../api/goods'
interface PropsType {
    sel: "only" | "many",
    cate_ids: number[]
}
export default function TableList(props: PropsType) {
    const { confirm } = Modal;
    //定义加载状态
    let [loading, setLoading] = useState(false)
    //表格内容
    let [tableData, setTableData] = useState([])
    //新增标签内容
    let [inputValue, setInputValue] = useState('')
    //当前选中项的索引
    let [activeIndex, setActiveIndex] = useState<number | null>(null)
    //当前选中的编辑行
    let [updateTab, setUpdateTab] = useState<AttrsType1 | null>(null)
    //定义模态框的状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    //改变模态框状态
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
    //表单校验
    const onFinish = async (values: any) => {
        let { attr_name } = values
        let data = {
            attr_name,
            attr_sel: props.sel
        }
        if (updateTab) {
            let res = await updateParams(props.cate_ids[2], updateTab.attr_id, data)
            if (res.data.meta.status === 200) {
                message.success(res.data.meta.msg)
                getList(props.cate_ids[2], { sel: props.sel })
                handleOk()
            } else {
                message.error(res.data.meta.msg)
            }
        } else {
            //发送请求添加动态或静态
            let res = await setAttribute(props.cate_ids[2], data)
            if (res.data.meta.status === 201) {
                message.success(res.data.meta.msg)
                getList(props.cate_ids[2], { sel: props.sel })
                handleOk()
            } else {
                message.error(res.data.meta.msg)
            }
        }
    };
    //改变当前标签内容
    let handleInputChange = (e: any) => {
        setInputValue(e.target.value)
    }
    //按下回车或者失去焦点时触发
    let handleInputConfirm = async (record: any) => {
        //添加属性值
        record.attr_vals.push(inputValue)
        let { cat_id, attr_id, attr_sel, attr_name, attr_vals } = record
        if (attr_sel === 'many') {
            attr_vals = attr_vals.join('')
        } else {
            attr_vals = attr_vals.join(',')
        }
        let res = await updateParams(cat_id, attr_id, { attr_name, attr_sel, attr_vals })
        if (res.data.meta.status === 200) {
            message.success(res.data.meta.msg)
            getList(props.cate_ids[2], { sel: props.sel })
            setInputValue('')
            setActiveIndex(null)
        }
    }
    //删除标签
    let removeTag = async (recoder: any, index: number) => {
        let { cat_id, attr_id, attr_sel, attr_name, attr_vals } = recoder;
        attr_vals.splice(index, 1);
        if (attr_sel === 'many') {
            attr_vals = attr_vals.join(" ")
        } else {
            attr_vals = attr_vals.join(",")
        }
        let res = await updateParams(cat_id, attr_id, { attr_name, attr_sel, attr_vals })
        if (res.data.meta.status === 200) {
            message.success(res.data.meta.msg)
            getList(props.cate_ids[2], { sel: props.sel });
            setInputValue("");
            setActiveIndex(null)
        }
    }
    //显示隐藏新建标签
    let showInput = (attr_id: number) => {
        setActiveIndex(attr_id)
    }
    //删除属性模态框
    const showConfirm = (id:number) => {
        confirm({
            title: '注意',
            icon: <ExclamationCircleFilled />,
            content: '您确定要删除当前属性吗?',
            okText:'确定',
            cancelText:'取消',
            onOk() {
                delAttribute(props.cate_ids[2],id).then(res=>{
                    if(res.data.meta.status === 200){
                        message.success(res.data.meta.msg)
                        getList(props.cate_ids[2], { sel: props.sel })
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
    let columns = [
        {
            title: '#',
            dataIndex: 'index',
            width: 100,
            render(text: string, record: any, index: number) {
                return <div>{index}</div>
            },
        },
        {
            title: '属性名称',
            dataIndex: 'attr_name',
        },
        {
            title: '操作',
            dataIndex: 'actions',
            render: (text: boolean, record: AttrsType1) => {
                return (
                    <>
                        <Button type='primary' icon={<EditOutlined />} size="small" style={{ marginRight: '10px' }} onClick={() => {
                            form.setFieldsValue({
                                attr_name: record.attr_name
                            })
                            setUpdateTab(record)
                            showModal()
                        }}>编辑</Button>
                        <Button type='primary' icon={<DeleteOutlined />} danger size="small" onClick={() => {
                            showConfirm(record.attr_id)
                        }}>删除</Button>
                    </>
                )
            }
        }
    ];
    //获取分类参数列表
    let getList = async (id: number, data: CateParamsSelType) => {
        setLoading(true)
        let res = await getAttributesList(id, data)
        res.data.data.forEach((item: any) => {
            if (props.sel === 'many') {
                if (item.attr_vals === '') {
                    item.attr_vals = []
                } else {
                    item.attr_vals = item.attr_vals.split(" ")
                }
            } else {
                if (item.attr_vals === '') {
                    item.attr_vals = []
                } else {
                    item.attr_vals = item.attr_vals.split(",")
                }
            }
        })
        setTableData(res.data.data)
        setLoading(false)
    }

    useEffect(() => {
        if (props.cate_ids.length !== 0) {
            //获取分类参数列表
            getList(props.cate_ids[2], { sel: props.sel })
        }
    }, [props.cate_ids])

    return (
        <div>
            <div>
                <Button type='primary' disabled={props.cate_ids.length === 0} onClick={showModal}>{props.sel === 'many' ? '添加参数' : '添加属性'}</Button>
            </div>
            <div style={{ margin: "20px 0" }}>
                <Table bordered columns={columns} dataSource={tableData} pagination={false} rowKey='attr_id' scroll={{ x: 500 }} loading={loading} expandedRowRender={(record: any) => {
                    return (
                        <div>
                            {
                                record.attr_vals.map((item: string, index: number) => {
                                    return (
                                        <Tag color='blue' key={index} closable onClose={() => {
                                            removeTag(record, index)
                                        }}>{item}</Tag>
                                    )
                                })
                            }
                            {
                                (activeIndex && activeIndex === record.attr_id) ? <Input
                                    style={{ width: "100px" }}
                                    type="text"
                                    size="small"
                                    value={inputValue}
                                    onChange={(e) => handleInputChange(e)}
                                    onBlur={() => handleInputConfirm(record)}
                                    onPressEnter={() => handleInputConfirm(record)}
                                /> :
                                    <Tag onClick={() => showInput(record.attr_id)}>
                                        <PlusOutlined /> New Tag
                                    </Tag>
                            }
                        </div>
                    )
                }}></Table>
            </div>
            <Modal footer={false} title={
                (props.sel === 'many' && updateTab) ? '编辑动态参数' : (props.sel === 'only' && updateTab) ? '编辑静态属性' : (props.sel === 'only') ? '添加静态属性' : '添加动态参数'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label={(props.sel === 'many' && updateTab) ? '动态参数' : (props.sel === 'only' && updateTab) ? '静态属性' : (props.sel === 'only') ? '静态属性' : '动态参数'}
                        name="attr_name"
                        rules={[{ required: true, message: '请输入内容!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleCancel}>
                            取消
                        </Button>&nbsp;
                        <Button type="primary" htmlType="submit">
                            {updateTab ? '确认修改' : '确认添加'}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

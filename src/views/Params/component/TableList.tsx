import { Button, Table, Tag, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getAttributesList, updateParams } from '../../../api/goods'
interface PropsType {
    sel: "only" | "many",
    cate_ids: number[]
}
export default function TableList(props: PropsType) {
    //定义加载状态
    let [loading, setLoading] = useState(false)
    //表格内容
    let [tableData, setTableData] = useState([])
    //新增标签内容
    let [inputValue, setInputValue] = useState('')
    //当前选中项的索引
    let [activeIndex, setActiveIndex] = useState<number | null>(null)
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
                        <Button type='primary' icon={<EditOutlined />} size="small" style={{ marginRight: '10px' }}>编辑</Button>
                        <Button type='primary' icon={<DeleteOutlined />} danger size="small">删除</Button>
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
            getList(props.cate_ids[2], { sel:props.sel })
        }
    }, [props.cate_ids])

    return (
        <div>
            <div>
                <Button type='primary' disabled={props.cate_ids.length === 0}>{props.sel === 'many' ? '添加参数' : '添加属性'}</Button>
            </div>
            <div style={{ margin: "20px 0" }}>
                <Table bordered columns={columns} dataSource={tableData} pagination={false} rowKey='attr_id' scroll={{ x: 500 }} loading={loading} expandedRowRender={(record: any) => {
                    return (
                        <div>
                            {
                                record.attr_vals.map((item: string, index: number) => {
                                    return (
                                        <Tag color='blue' key={index} closable onClose={() => {
                                            removeTag(record,index)
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
        </div>
    )
}

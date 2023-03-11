import React, { useState, useEffect, useMemo } from 'react';
import { Button, message, Steps, theme, Alert, Form, Input, Cascader,Tag } from 'antd';
import { getGoodsCateList, getAttributesList } from '../../api/goods';

export default function AddGoods() {
    //商品分类列表
    let [goodsCateList, setGoodsCateList] = useState<GetgoodsCate[]>([]);
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    //商品静态参数列表
    let [goodsAttributesList, setGoodsAttributesList] = useState([])
    //商品动态参数列表
    let [goodsAttributesList2, setGoodsAttributesList2] = useState([])
    //全局提示
    const [messageApi, contextHolder] = message.useMessage();
    //提交表单
    const onFinish = (values: AddGoodsType) => {
        console.log('Success:', values);
        let newValues = JSON.parse(JSON.stringify(values))
        let new_goods_cat = newValues.goods_cat.join(',')
        newValues.goods_cat = new_goods_cat
        //步骤一的商品属性
        console.log(newValues);
        //获取三级分类列表id
        let cid = values.goods_cat[2]
        //跳下一页
        setCurrent(current + 1)
        //获取静态属性
        getAttributesList(cid,{sel:'many'}).then(res => {
            setGoodsAttributesList(res.data.data)
        })
        //获取动态属性
        getAttributesList(cid,{sel:'many'}).then(res => {
            setGoodsAttributesList2(res.data.data)
        })
    };
    //提交失败表单回调
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    //处理商品分类
    let NEWoptions = useMemo(() => {
        let Items: GoodsCateTypeOption[] = []
        if (goodsCateList.length !== 0) {
            goodsCateList.forEach((item: GetgoodsCate) => {
                let obj: GoodsCateTypeOption = {
                    value: item.cat_id,
                    label: item.cat_name,
                    children: [],
                }
                if (item.children) {
                    item.children.forEach((two: GetgoodsCate) => {
                        let twoObj: GoodsCateTypeOption = {
                            value: two.cat_id,
                            label: two.cat_name,
                            children: [],
                        }
                        obj.children?.push(twoObj)
                        if (two.children) {
                            two.children.forEach((three: GetgoodsCate) => {
                                let threeObj: GoodsCateTypeOption = {
                                    value: three.cat_id,
                                    label: three.cat_name,
                                }
                                twoObj.children?.push(threeObj)
                            })
                        }
                    })
                }
                Items.push(obj)
            });
        }
        return Items
    }, [goodsCateList])

    const steps = [
        {
            title: '基本信息',
            content: <div>
                <Form
                    style={{ textAlign: 'left' }}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="商品名称"
                        name="goods_name"
                        rules={[{ required: true, message: '请输入商品名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="商品价格"
                        name="goods_price"
                        rules={[{ required: true, message: '请输入商品价格!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="商品重量"
                        name="goods_weight"
                        rules={[{ required: true, message: '请输入商品重量' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="商品库存"
                        name="goods_number"
                        rules={[{ required: true, message: '请输入商品库存' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="商品分类"
                        name="goods_cat"
                        rules={[{ required: true, message: '请选择商品分类' }]}
                    >
                        <Cascader options={NEWoptions} placeholder="请选择商品分类" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 11, span: 12 }}>
                        <Button type="primary" htmlType="submit" >
                            下一步
                        </Button>
                    </Form.Item>
                </Form>
            </div>,
        },
        {
            title: '商品参数',
            content: <div>
                {
                    goodsAttributesList.map((item: AttrsType1, index:number) => {
                        return (
                            <div key={index}>
                                <p>{item.attr_name}</p>
                                {
                                    item.attr_vals?.map((two:string, idx:number) => {
                                        return (
                                            <Tag color="magenta" key={idx}>{two}</Tag>
                                        )
                                    })
                                }
                            </div>

                        )
                    })
                }
                <Button type="primary" htmlType="submit" onClick={()=>{
                    //跳下一页
                    setCurrent(current + 1)
                }}>
                    下一步
                </Button>
            </div>,
        },
        {
            title: '商品属性',
            content: 'Second-content',
        },
        {
            title: '商品图片',
            content: 'Second-content',
        },
        {
            title: '商品内容',
            content: 'Second-content',
        },
        {
            title: '完成',
            content: 'Last-content',
        },
    ];
    //下一步
    const next = () => {
        setCurrent(current + 1)
    };
    //上一步
    const prev = () => { setCurrent(current - 1) };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        padding: '10px 20px 0px 20px',
        boxSizing: 'border-box',
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        borderRadius: token.borderRadiusLG,
    };

    useEffect(() => {
        getGoodsCateList().then(res => {
            console.log(res.data.data);
            setGoodsCateList(res.data.data);
        })
    }, [])

    return (
        <div>
            <div>
                <Alert
                    style={{ marginBottom: '20px', height: "40px" }}
                    message="添加商品信息"
                    type="success"
                    showIcon
                    action={<Button size="small" type="text"></Button>}
                    closable
                />
            </div>
            <div>
                <Steps current={current} items={items} style={{ padding: '0px 20px' }} />
                <div style={contentStyle}>{steps[current].content}</div>
                {/* <div style={{ marginTop: 24, textAlign: 'center' }} >
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            下一步
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            完成
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            上一步
                        </Button>
                    )}
                </div> */}
            </div>
            {contextHolder}
        </div>
    )
}

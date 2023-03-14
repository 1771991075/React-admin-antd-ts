import {  Form, Input,Cascader,message } from 'antd';
import { useEffect, useRef, useState,forwardRef, useImperativeHandle } from 'react';
import { getGoodsCateList } from '../../../api/goods';
function GoodsInfo(props:any,ref:any){
    let [messageApi,context] = message.useMessage();
    let [options,setoptions] = useState([]);
    let formRef:{current:any} = useRef();
    let onChange = (value:any)=>{
        console.log(value)
        if(value.length<3){
            messageApi.error("请选择三级分类")
            return
        }
    }
    let getCate =async ()=>{
        let res:any = await getGoodsCateList()
        setoptions(res.data.data)
    }
    useEffect(()=>{
        getCate();
    },[])
    useImperativeHandle(ref,()=>{
        return {
            validateFields:formRef.current.validateFields
        }
    })
    return (
        <div>
            {context}
          <Form 
                ref={formRef}
                name="basic"
                labelCol={{ span: 4 }}
                style={{ width: '100%' }}
                autoComplete="off"
                layout="vertical"
                initialValues={{goods_price:0,goods_weight:0,goods_number:0}}
            >
                <Form.Item
                    label="商品名称"
                    name="goods_name"
                    rules={[{ required: true, message: '请输入商品名称' }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="商品价格"
                    name="goods_price"
                    rules={[{ required: true, message: '请输入商品价格'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品重量"
                    name="goods_weight"
                    rules={[{ required: true, message: '请输入商品重量'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品库存"
                    name="goods_number"
                    rules={[{ required: true, message: '请输入商品库存'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品分类"
                    name="cat_id"
                    rules={[{ required: true, message: '请输入商品分类'}]}
                >
                    <Cascader options={options} onChange={onChange} placeholder="请选择商品分类" fieldNames={{label:"cat_name",value:"cat_id",children:"children"}}/>
                </Form.Item>
            </Form>
        </div>
    )
}

export default forwardRef(GoodsInfo);
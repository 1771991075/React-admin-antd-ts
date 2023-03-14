import React, { useState ,useRef} from 'react';
import { Button, message, Steps, theme, Alert, Form, Input, Cascader, Tag } from 'antd';
import { getGoodsCateList, getAttributesList } from '../../api/goods';
import GoodsInfo from './component/goodsInfo';
import GoodsImg from './component/goodsImg';
import GoodsParams from './component/goodsParams';
import GoodsAttr from './component/goodsAttr';
import GoodsContent from './component/goodsContent';
import GoodsOver from './component/addOver';
export default function AddGoods() {
    //步骤索引
    let [current, setCurrent] = useState(0)
    //商品详情ref实例
    let GoodsInfoRef: { current: any } = useRef();
    //商品参数ref实例
    let GoodsParamsRef1: { current: any } = useRef();
    //商品详情
    let [info, setInfo] = useState<GoodInfoType>()
    // 下一步
    let next = () => {
        console.log(GoodsInfoRef)
        GoodsInfoRef.current.validateFields().then((res: any) => {
            console.log(res)
            setInfo(res)
            current++;
            setCurrent(current)
        }).catch((err: any) => {
            
        })
    }
    let prever = () => {
        current--;
        setCurrent(current)
    }
    let items = [
        {
            title: '基本信息',
        },
        {
            title: '商品参数',
        },
        {
            title: '商品属性',
        },
        {
            title: '商品图片',
        },
        {
            title: '商品内容',
        },
        {
            title: "完成",
        }
    ]
    return (
        <div>
            <div>
                <Alert message="添加商品信息" type="success" showIcon closable />
            </div>
            <div style={{ padding: "20px" }}>
                <Steps
                    size="default"
                    current={current}
                    items={items}
                />
                <div style={{ padding: "20px 0", minHeight: "400px" }}>
                    {
                        current === 0 && <GoodsInfo ref={GoodsInfoRef}></GoodsInfo>
                    }
                    {
                        current === 1 && <GoodsParams info={info} ref={GoodsParamsRef1}></GoodsParams>
                    }
                    {
                        current === 2 && <GoodsAttr />
                    }
                    {
                        current === 3 && <GoodsImg />
                    }
                    {
                        current === 4 && <GoodsContent />
                    }
                    {
                        current === 5 && <GoodsOver />
                    }
                </div>
                <div style={{ textAlign: "center" }}>
                    {
                        (current > 0 && current !== 5) && <Button type='primary' onClick={() => prever()}>上一步</Button>
                    }
                    &nbsp;     &nbsp;     &nbsp;
                    {
                        current < 4 && <Button type='primary' onClick={() => next()}>下一步</Button>
                    }
                    &nbsp;     &nbsp;     &nbsp;
                    {
                        current === 4 && <Button type='primary' onClick={() => next()}>确认添加</Button>
                    }
                </div>
            </div>

        </div>
    )
}

import { useState, useRef } from 'react';
import { Button,Steps, Alert} from 'antd';
import { getAttributesList,addGoods } from '../../api/goods';
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
    //商品富文本标签
    let contentRef:{current:any} = useRef();
    //商品参数
    let [paramsList, setParamsList] = useState<AttrsType1[]>([])
    //定义当前属性列表
    let [attrList, setAttrList] = useState<AttrsType1[]>([])
    //获取商品图片
    let [dataImg, setDataImg] = useState({
        tmp_path: "",
        url: ""
    })
    //商品详情
    let [info, setInfo] = useState<GoodInfoType>()
    // 定义当前最新的属性列表
    let [newattrs,setAttrs] = useState<any>();
    //获取分类参数
    let getGoodsParams = async (id: number) => {
        //获取分类参数
        let res = await getAttributesList(id, { sel: 'many' })
        setParamsList(res.data.data)
        //处理分类参数
        res.data.data.forEach((item: AttrsType1) => {
            let attr_vals = item.attr_vals as string;
            item.attr_vals = attr_vals.split(" ");
        })
        setParamsList(res.data.data)
    }
    //获取分类属性
    let getGoodsAttr = async (id: number) => {
        let res = await getAttributesList(id, { sel: 'only' });
        setAttrList(res.data.data)
    }
    // 下一步
    let next = () => {
        if (current === 0) {
            //校验表单
            GoodsInfoRef.current.validateFields().then((res: any) => {
                //获取三级分类id
                let id: number = res.cat_id[2]
                //获取分类参数
                getGoodsParams(id)
                //获取分类属性列表
                getGoodsAttr(id)
                setInfo(res)
                current++;
                setCurrent(current)
            }).catch((err: any) => {

            })
            return
        }
        current++;
        setCurrent(current)
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

    //确认添加商品
    let add = async ()=>{
        let {cat_id,goods_name,goods_price,goods_weight,goods_number} = info as GoodInfoType; 
        let goods_cat = cat_id.join(',')
        let goods_introduce = contentRef.current.myEditor.txt.html()
        let attrs:Attrs[] = []
        paramsList.forEach((item:AttrsType1)=>{
            let obj:Attrs = {
                attr_id:item.attr_id,
                attr_value:(item.attr_vals as string[]).join(' ')
            }
            attrs.push(obj)
        })
        for(let key in newattrs){
            let obj:Attrs = {
                attr_id:Number(key),
                attr_value:newattrs[key]
            }
            attrs.push(obj)
        }
        //  请求参数
        let data:AddGoodsParams ={
            goods_cat,
            goods_price,
            goods_number,
            goods_introduce,
            goods_weight,
            attrs,
            goods_name
        }
        console.log(data)
        let res:ResponsType = await addGoods(data);
        if(res.data.meta.status===201){
            current++;
            setCurrent(current)
        }
    }

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
                        current === 1 && <GoodsParams paramsList={paramsList} removeTag={(index: number, i: number) => {
                            (paramsList[index].attr_vals as string[]).splice(i, 1);
                            setParamsList([...paramsList])
                        }}></GoodsParams>
                    }
                    {
                        current === 2 && <GoodsAttr attrList={attrList} />
                    }
                    {
                        current === 3 && <GoodsImg uploadOver={(res:any)=>{
                            setDataImg(res)
                        }}/>
                    }
                    {
                        current === 4 && <GoodsContent ref={contentRef}/>
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
                        current === 4 && <Button type='primary' onClick={() => add()}>确认添加</Button>
                    }
                </div>
            </div>

        </div>
    )
}

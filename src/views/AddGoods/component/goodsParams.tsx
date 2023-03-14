import {Tag,Empty} from 'antd'
interface PropsType{
    paramsList:AttrsType1[];
    removeTag:(index:number,i:number)=>void;
}
function GoodsParams(props:PropsType){
    let {paramsList} = props;
    console.log(paramsList)
    return (
        <div>
            {
                paramsList.length===0 && <Empty></Empty>
            }
            {
                paramsList.map((item:AttrsType1,index:number)=>{
                    return (
                        <div key={index}>
                            <div>
                                {item.attr_name}
                            </div>
                            <div style={{margin:'20px 0'}}>
                                {
                                   (item.attr_vals as string[]).map((attr:string,i:number)=>{
                                    return (
                                        <Tag color='blue' closable key={i} onClose={()=>{
                                            // 删除父组件中的分类参数列表
                                            props.removeTag(index,i)
                                        }}>{attr}</Tag>
                                    )
                                   })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GoodsParams;
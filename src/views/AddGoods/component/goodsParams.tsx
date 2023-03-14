import { getAttributesList} from '../../../api/goods';
import { useState ,forwardRef , useEffect} from 'react';

function GoodsParams(props:any,ref:any) {
  //商品静态参数
  let [goodsParams,setGoodsParams] = useState<AttrsType1[]>()
  

  useEffect(()=>{
    getAttributesList(props.info.cat_id[2],{sel:'many'}).then(res=>{
      console.log(res);
      setGoodsParams(res.data.data)
    })
  },[])

  return (
    <div>
      <div>
        {
          goodsParams?.map((item:AttrsType1,index:number)=>{
            return (
              <div>
                  <p>{item.attr_name}</p>
                  
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default forwardRef(GoodsParams)

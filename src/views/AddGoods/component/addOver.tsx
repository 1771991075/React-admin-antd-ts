import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
function GoodsOver(props: any) {
  let navigate = useNavigate();
  return (
    <div>
      <Result
        status="success"
        title="添加商品成功！！！"
        extra={[
          <Button type="primary" key="console" onClick={() => {
            navigate("/index/goods")
          }}>
            商品列表
          </Button>,
          <Button key="buy" onClick={() => {
            props.over()
          }}>再次添加</Button>,
        ]}
      />
    </div>
  )
}

export default GoodsOver;
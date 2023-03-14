import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useSelector } from 'react-redux';
function GoodsImg(props: any) {

  let token = useSelector((state: StateType) => {
    return state.userReducer.token
  })

  return (
    <div>
      <Upload action='http://106.12.150.223:8090/api/private/v1/upload'
        headers={{ Authorization: token as string }}
        name='file'
        onChange={(res: any) => {
          if (res.file.response) {
            if (res.file.response.meta.status === 200) {
              message.success("上传成功");
              // 告诉父组件上传成功
              props.uploadOver(res.file.response.data)
            }
          }
        }}
        listType='picture'
      >
        <Button icon={<UploadOutlined />} type='primary' >上传商品图片</Button>
      </Upload>
    </div>
  )
}

export default GoodsImg;

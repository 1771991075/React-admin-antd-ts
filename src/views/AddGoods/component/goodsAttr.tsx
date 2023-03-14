import { Form, Input } from 'antd'
interface PropsType {
  attrList: AttrsType1[];
}

function GoodsAttr(props: PropsType) {
  let { attrList } = props;
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        style={{ width: '100%' }}
        autoComplete="off"
        layout="vertical"
      >
        {
          attrList.map((item: AttrsType1, index: number) => {
            return (
              <Form.Item
                label={item.attr_name}
                name={item.attr_id}
                key={index}
                initialValue={item.attr_vals}
              >
                <Input />
              </Form.Item>
            )
          })
        }
      </Form>
    </div>
  )
}

export default GoodsAttr;
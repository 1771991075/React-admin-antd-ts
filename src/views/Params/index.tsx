import { Button, Alert, Cascader, Tabs, Table } from 'antd';
import { useState, useEffect, useMemo, } from 'react';
import { getGoodsCateList, getAttributesList } from '../../api/goods';
import type { TabsProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Params() {
  //商品分类列表
  let [goodsCateList, setGoodsCateList] = useState<GetgoodsCate[]>([]);
  //商品静态参数列表
  let [goodsAttributesList, setGoodsAttributesList] = useState([])
  //商品动态参数列表
  let [goodsAttributesList2, setGoodsAttributesList2] = useState([])
  let [data, setData] = useState<AttrsType1[]>()
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
  //表格表头
  const columns: ColumnsType<AttrsType1> = [
    {
      title: '#',
      dataIndex: 'attr_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '属性名称',
      dataIndex: 'attr_name',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      render: () => {
        return (
          <>
            <Button type='primary' icon={<FormOutlined />} size="small" style={{ marginRight: '10px' }}>编辑</Button>
            <Button type='primary' icon={<DeleteOutlined />} danger size="small">删除</Button>
          </>
        )
      }
    }
  ];

  const items: TabsProps['items'] = [
    {
      key: 'many',
      label: `动态参数`,
      children: <div>
        <Button type='primary'>添加参数</Button>
        <Table
          rowKey={(record)=>record.attr_id}
          style={{ marginTop: '20px' }}
          bordered
          columns={columns}
          // expandable={{
          //   expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          //   rowExpandable: (record) => record.name !== 'Not Expandable',
          // }}
          dataSource={data}
        />
      </div>,
    },
    {
      key: 'only',
      label: `静态属性`,
      children: <div>
        <Button type='primary'>添加属性</Button>
        <Table
          rowKey={(record)=>record.attr_id}
          style={{ marginTop: '20px' }}
          bordered
          columns={columns}
          // expandable={{
          //   expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          //   rowExpandable: (record) => record.name !== 'Not Expandable',
          // }}
          dataSource={data}
        />
      </div>
    }
  ];
  //选择商品分类
  const onChange = (value: any) => {
    console.log(value);
    //获取静态属性
    getAttributesList(value[2], { sel: 'many' }).then(res => {
      setGoodsAttributesList(res.data.data)
    })
    //获取动态属性
    getAttributesList(value[2], { sel: 'many' }).then(res => {
      setGoodsAttributesList2(res.data.data)
    })
  };

  useEffect(() => {
    getGoodsCateList().then(res => {
      console.log(res.data.data);
      setGoodsCateList(res.data.data);
    })
  }, [])

  return (
    <div>
      <Alert
        style={{ marginBottom: '20px', height: "40px" }}
        message="注意：只允许为三级分类设置相关参数！！！"
        type="warning"
        showIcon
        action={<Button size="small" type="text"></Button>}
        closable
      />
      <div>
        选择商品分类:<Cascader options={NEWoptions} onChange={(values) => onChange(values)} placeholder="请选择商品分类" style={{ marginLeft: '20px' }} />
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={(key: string) => {
        if (key === 'many') {
          setData(goodsAttributesList2)
        } else {
          setData(goodsAttributesList)
        }
      }} />
    </div>
  )
}

import { Col, Row ,Tag} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons'
import { deleteRoles } from '../../../api/roles';

export default function RowRender(props: RolesRowPropType) {
    let {record} = props
    console.log(record);
    //删除指定权限
    let removeRoles = async (e:any,rolesid:number) =>{
        //阻止默认事件
        e.preventDefault()
        let res:any = await deleteRoles(record.id,rolesid)
        props.over(res)
    }
    
    return (
        <div>
            {
                record.list?.map((item:ListType,index:number)=>{
                    return (
                        <Row key={index} style={{margin:'15px 0px',borderBottom:'1px solid #f1f1f1'}}>
                            <Col span={5}>
                                <Tag color={'cyan'} closable>{item.authName}</Tag><CaretRightOutlined />
                            </Col>
                            <Col span={19}>
                                {
                                    item.list?.map((two:ListType,idx:number)=>{
                                        return (
                                            <Row key={idx} style={{marginBottom:'15px'}}>
                                                <Col span={5}>
                                                    <Tag color={'green'} closable>{two.authName}</Tag><CaretRightOutlined />
                                                </Col>
                                                <Col span={19}>
                                                    {
                                                        two.list && two.list.map((three:ListType,i:number)=>{
                                                            return (
                                                                <Tag key={i} color={'orange'} closable onClose={(e)=>removeRoles(e,three.id)}>{three.authName}</Tag>
                                                            )
                                                        })
                                                    }
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    )
                })
            }
        </div>
    )
}

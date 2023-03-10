import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Button, Modal, Select } from 'antd';
import { getRolesList } from '../../../api/roles';
import { updateRoles } from '../../../api/roles';

function DealUser(props: {over:Function}, ref: any) {

    let [items, setItems] = useState<RolesType[]>([])
    let [isShow, setIsShow] = useState(false)
    //当前选中的角色id
    let [rolesId, setRolesId] = useState(0)
    //当前选中的用户
    let [record,setRecord] = useState<DataType | null>(null)

    //父组件点击显示子组件的状态
    let init = (record:DataType) => {
        setRecord(record)
        setIsShow(true);
    }
    //将init初始化方法暴露给父组件
    useImperativeHandle(ref, () => {
        return { init }
    })
    //选中选择框中调用
    const handleChange = (value: number) => {
        setRolesId(value)
    };
    //提交按钮
    let onFinish = async() => {
        let data = {rid:rolesId}
        if(record){
            let res = await updateRoles(record.id,data)
            if(res.data.meta.status === 200){
                setIsShow(false)
                props.over(res)
                return
            }
            props.over(res)
        }
        
    }

    const handleCancel = () => {
        setIsShow(false);
    };

    useEffect(() => {
        getRolesList().then(res => {
            if (res.data.meta.status === 200) {
                let newRes: RolesType[] = []
                res.data.data.forEach((item: RolesDataType) => {
                    let obj = {
                        value: item.id,
                        label: item.roleName
                    }
                    newRes.push(obj)
                });
                setItems(newRes)
            }
        })
    }, [])

    return (
        <div>
            <Modal title="分配角色" open={isShow} footer={null} onCancel={handleCancel}>
                <p>当前用户:{record?.username}</p>
                <p>当前角色:{record?.role_name}</p>
                <Select
                    placeholder="请选择角色"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={items}
                />
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <Button onClick={handleCancel} style={{marginRight:'10px'}}>取消</Button>
                    <Button type='primary' onClick={onFinish}>确认</Button>
                </div>
            </Modal>
        </div>
    )
}

export default forwardRef(DealUser)

import { Modal, Tree } from 'antd';
import { useState,forwardRef, useImperativeHandle } from 'react'
import { setRights } from '../../../api/roles';
function SetRights(props:any,ref:any) {
    // 定义控制对话框显示与隐藏状态
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [treeData,setTreeData]= useState<any[]>([]);
    // 定义默认展开权限列表 存放一级二级权限id
    let [expandedKeys,setexpandedKeys] = useState<number[]>([]);
    // 定义选中的权限列表 存放三级权限
    let [checkedKeys,setcheckedKeys]= useState<number[]>([])
    // 定义半选中keys
    let [halfCheckedKeys,setHalfKeys] = useState<number[]>([])
    //当前角色id
    let [id,setId] = useState(0)
    // 点击取消时调用
    let handleCancel = () => {
        setIsModalOpen(false)
        setexpandedKeys([]);
        setcheckedKeys([])
    }
    // 确认分配角色
    let okHandle = async () => {
        let ids = [...checkedKeys,...halfCheckedKeys].join(",");
        let data:SetRightsParams={
            rids:ids
        }
        let res = await setRights(id,data);
        props.over(res)
        handleCancel();
    }
    let init = (rigthsList:RightsType[],list:RolesTableItem[],id:number)=>{
        setId(id)
        console.log(rigthsList)
        setIsModalOpen(true)
        setTreeData(rigthsList)
        console.log(list)
        // 处理所有权限列表分别将一级权限id,二级权限id存放到expandedKeys 三级权限id存放到选中列表中
        list.forEach((item:RolesTableItem)=>{
            // 将一级权限id放入expandedKeys
            expandedKeys.push(item.id);
            // 将二级权限id放入expandedKeys
            item.list?.forEach((two:any)=>{
                expandedKeys.push(two.id)
                // 将三级权限id放入 选中列表中
                two.list.forEach((three:any)=>{
                    checkedKeys.push(three.id)
                })
            })
        })
        setexpandedKeys(expandedKeys);
        setcheckedKeys(checkedKeys)
    }
    useImperativeHandle(ref,()=>{
        return {
            init
        }
    })
    return (
        <Modal title={"分配权限"} open={isModalOpen} onCancel={handleCancel} cancelText='取消' okText='确定' onOk={okHandle}>
            <Tree
                checkable
                expandedKeys={expandedKeys}
                checkedKeys={checkedKeys}
                fieldNames={{
                    title:"authName",
                    children:"children",
                    key:"id",
                }}
                treeData={treeData}
                onExpand={(value:any)=>{
                    console.log(value)
                    setexpandedKeys(value);
                }}
                onCheck={(checkedKeys:any,e:any)=>{
                    console.log(checkedKeys)
                    setcheckedKeys(checkedKeys)
                    console.log(e)
                    setHalfKeys(e.halfCheckedKeys)
                }}
            />
        </Modal>
    )
}

export default forwardRef(SetRights);
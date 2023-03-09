let navActions  = (list:string[]):NavActions =>{
    return {
        type:'SET_NAV_LIST',
        list:list
    }
} 

export default navActions;
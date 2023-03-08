let userActions = (playload:UserReduxType):UserReduxActions =>{
    return {
        type:'SET_USER_INFO',
        playload
    }
}

export default userActions;
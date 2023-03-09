interface StateType {
    userReducer:UserReduxType,
    navReducer:NavStateType
}

interface NavStateType {
    navList:string[]
}

interface NavActions {
    type:string,
    list:string[]
}
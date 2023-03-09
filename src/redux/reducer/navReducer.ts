let defaultState:NavStateType = {
    navList: []
}

let navReducer = (state:NavStateType=defaultState,actions:NavActions) =>{
    switch(actions.type){
        case 'SET_NAV_LIST':
            let newState = {...state}
            newState.navList = actions.list
            return newState
        default :
            return state
    }
}

export default navReducer
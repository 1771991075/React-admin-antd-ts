import { legacy_createStore as createStore, compose, combineReducers, applyMiddleware } from 'redux';
// 引入用户reducer
import userReducer from './reducer/userReducer';
// 引入中间件
import ReduxThunk from 'redux-thunk';
import navReducer from './reducer/navReducer';

let reducer = combineReducers({
    userReducer,
    navReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 创建仓库
let store = createStore(reducer,composeEnhancers(applyMiddleware(ReduxThunk)))

export default store;
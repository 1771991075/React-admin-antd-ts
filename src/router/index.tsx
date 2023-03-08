import { Routes,Route } from 'react-router-dom';
//引入路由表
import element from './element';
//引入鉴权组件
import Author from './Author';

function RouterViews(){
    return (
        <Routes>
            {
                element.map((item:RouterObject,index:number)=>{
                    return (
                        <Route key={index} path={item.path} element={item.author?<Author oldPath={item.path} oldComponent={item.element}/>:item.element}></Route>
                    )
                })
            }
        </Routes>
    )
}
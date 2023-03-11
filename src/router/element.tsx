import { lazy, Suspense } from "react";
import { Navigate } from 'react-router-dom'
import Loading from "../component/Loading";
let Login = lazy(() => import('../views/Login'))
let Index = lazy(() => import('../views/Index'))
let Home = lazy(() => import('../views/Home'))
//引入用户列表
let Users = lazy(() => import('../views/Users'))
//引入权限列表
let Roles = lazy(() => import('../views/Roles'))
let Rights = lazy(() => import('../views/Rights'))
let Goods = lazy(() => import('../views/Goods'))
let Params = lazy(() => import('../views/Params'))
let Categories = lazy(() => import('../views/Categories'))
let Orders = lazy(() => import('../views/Orders'))
let Reports = lazy(() => import('../views/Reports'))
let AddGoods = lazy(() => import('../views/AddGoods'))
let NotFound = lazy(()=>import('../component/NotFound'))

let element:RouterObject[] = [
    {
        path: '/index',
        element: <Suspense fallback={<Loading/>}><Index /></Suspense>,
        author: true,
        children:[
            {
                path:'home',
                element:<Suspense fallback={<Loading/>}><Home /></Suspense>,
                author:true
            },
            {
                path:'users',
                element:<Suspense fallback={<Loading/>}><Users /></Suspense>,
                author:true
            },
            {
                path:'roles',
                element:<Suspense fallback={<Loading/>}><Roles /></Suspense>,
                author:true
            },
            {
                path:'rights',
                element:<Suspense fallback={<Loading/>}><Rights /></Suspense>,
                author:true
            },
            {
                path:'goods',
                element:<Suspense fallback={<Loading/>}><Goods /></Suspense>,
                author:true
            },
            {
                path:'categories',
                element:<Suspense fallback={<Loading/>}><Categories /></Suspense>,
                author:true
            },
            {
                path:'orders',
                element:<Suspense fallback={<Loading/>}><Orders /></Suspense>,
                author:true
            },
            {
                path:'reports',
                element:<Suspense fallback={<Loading/>}><Reports /></Suspense>,
                author:true
            },
            {
                path:'params',
                element:<Suspense fallback={<Loading/>}><Params /></Suspense>,
                author:true
            },
            {
                path:'addgoods',
                element:<Suspense fallback={<Loading/>}><AddGoods /></Suspense>,
                author:true
            },
        ]
    },
    {
        path: '/login',
        element: <Suspense fallback={<Loading/>}><Login /></Suspense>,
        author: false
    },
    {
        path: '/',
        element: <Navigate to={'/index/home'}></Navigate>,
        author: true
    },
    {
        path: '*',
        element: <Suspense fallback={<Loading/>}><NotFound /></Suspense>,
        author: false
    },
]

export default element;
import { lazy, Suspense } from "react";
import { Navigate } from 'react-router-dom'
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

let element:RouterObject[] = [
    {
        path: '/index',
        element: <Suspense fallback='loading...'><Index /></Suspense>,
        author: true,
        children:[
            {
                path:'home',
                element:<Suspense fallback='loading...'><Home /></Suspense>,
                author:true
            },
            {
                path:'users',
                element:<Suspense fallback='loading...'><Users /></Suspense>,
                author:true
            },
            {
                path:'roles',
                element:<Suspense fallback='loading...'><Roles /></Suspense>,
                author:true
            },
            {
                path:'rights',
                element:<Suspense fallback='loading...'><Rights /></Suspense>,
                author:true
            },
            {
                path:'goods',
                element:<Suspense fallback='loading...'><Goods /></Suspense>,
                author:true
            },
            {
                path:'categories',
                element:<Suspense fallback='loading...'><Categories /></Suspense>,
                author:true
            },
            {
                path:'orders',
                element:<Suspense fallback='loading...'><Orders /></Suspense>,
                author:true
            },
            {
                path:'reports',
                element:<Suspense fallback='loading...'><Reports /></Suspense>,
                author:true
            },
            {
                path:'params',
                element:<Suspense fallback='loading...'><Params /></Suspense>,
                author:true
            }
        ]
    },
    {
        path: '/login',
        element: <Suspense fallback='loading...'><Login /></Suspense>,
        author: false
    },
    {
        path: '/',
        element: <Navigate to={'/index/home'}></Navigate>,
        author: true
    },
]

export default element;
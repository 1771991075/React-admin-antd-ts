import { lazy, Suspense } from "react";
import { Navigate } from 'react-router-dom'
let Login = lazy(() => import('../views/Login'))
let Index = lazy(() => import('../views/Index'))
let Home = lazy(() => import('../views/Home'))
let Users = lazy(() => import('../views/Users'))

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
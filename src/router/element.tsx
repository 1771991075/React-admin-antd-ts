import { lazy, Suspense } from "react";
import { Navigate } from 'react-router-dom'
let Login = lazy(() => import('../views/Login'))
let Index = lazy(() => import('../views/Index'))
let Home = lazy(() => import('../views/Home'))
let Users = lazy(() => import('../views/Users'))
let Roles = lazy(() => import('../views/Roles'))
let Rights = lazy(() => import('../views/Rights'))

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
import { lazy, Suspense } from "react";
import { Navigate } from 'react-router-dom'
let Login = lazy(() => import('../views/Login'))
let Index = lazy(() => import('../views/Index'))

let element:RouterObject[] = [
    {
        path: '/index',
        element: <Suspense fallback='loading...'><Index /></Suspense>,
        author: true
    },
    {
        path: '/login',
        element: <Suspense fallback='loading...'><Login /></Suspense>,
        author: false
    },
    {
        path: '/',
        element: <Navigate to={'/index'}></Navigate>,
        author: false
    },
]

export default element;
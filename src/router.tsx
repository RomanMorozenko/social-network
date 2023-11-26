import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouteObject,
    RouterProvider,
} from 'react-router-dom'
import { UserLayout } from './pages/userLayout'
import { Profile } from './pages/profile'
import { Users } from './pages/users'
import { Messages } from './pages/messages'
import { useMeQuery } from './services/auth/auth.service'
import { Login } from './pages/login'

import { Layout as AntLayout } from 'antd'

const { Header } = AntLayout

const publicRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
    },
]

const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/profile'} />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/profile/:id',
                element: <Profile />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/messages',
                element: <Messages />,
            },
        ],
    },
]

export const Router = () => {
    return (
        <>
            <AntLayout>
                <Header
                    style={{ display: 'flex', alignItems: 'center' }}
                ></Header>
                <RouterProvider router={router} />
            </AntLayout>
        </>
    )
}

export const AppContainer = () => {
    const { isLoading, data } = useMeQuery()

    const isAuthenticated = data?.resultCode == 1 ? false : true

    if (isLoading) return <div>Loading...</div>
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const router = createBrowserRouter([
    {
        element: <AppContainer />,
        path: '/',
        children: [...privateRoutes],
    },
    ...publicRoutes,
])

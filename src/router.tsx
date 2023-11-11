import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouteObject,
    RouterProvider,
} from 'react-router-dom'
import { Layout } from './pages/layout'
import { Profile } from './pages/profile'
import { Users } from './pages/users'
import { Messages } from './pages/messages'

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [],
    },
]

const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/profile',
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

const router = createBrowserRouter([
    {
        element: <PrivateRoutes />,
        children: privateRoutes,
    },
    ...publicRoutes,
])

function PrivateRoutes() {
    const isAuthenticated = true

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export const Router = () => {
    return <RouterProvider router={router} />
}

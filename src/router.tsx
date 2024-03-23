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
import { Chat } from './pages/chat'
import { useMeQuery } from './services/auth/auth.service'
import { Login } from './pages/login'
import { Header } from './components/ui/header'
import { InfinitySpin } from 'react-loader-spinner'
import { ErrorPage } from './pages/error'

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
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '*',
                element: <ErrorPage />,
            },
        ],
    },
]

export const Router = () => {
    const { isLoading, data } = useMeQuery()

    const isAuth = data?.resultCode === 0

    if (isLoading)
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '40vh',
                }}
            >
                <InfinitySpin width="200px" color="blue" />
            </div>
        )

    return (
        <>
            <Header isAuth={isAuth} />
            <RouterProvider router={router} />
        </>
    )
}

export const AppContainer = () => {
    const { isLoading, data } = useMeQuery()

    const isAuthenticated = data?.resultCode == 1 ? false : true

    console.log('isAuthenticated', isAuthenticated)

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

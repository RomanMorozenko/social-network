import s from './layout.module.scss'

import { Outlet, useNavigate } from 'react-router-dom'

import {
    UserOutlined,
    ProfileOutlined,
    MessageOutlined,
} from '@ant-design/icons'
import { Layout as AntLayout, Menu } from 'antd'
import { useMeQuery } from '../services/auth/auth.service'

export const UserLayout = () => {
    const navigate = useNavigate()
    const { isLoading } = useMeQuery()

    if (isLoading) return <div>Loading...</div>

    const handleNavMenuClick = (path: string) => {
        navigate(`/${path}`)
    }

    return (
        <AntLayout>
            <Sider width={200} style={{ background: 'lightgrey' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={items2}
                    onClick={({ keyPath }) =>
                        handleNavMenuClick(keyPath[0].toLocaleLowerCase())
                    }
                />
            </Sider>
            <Outlet />
        </AntLayout>
    )
}

const { Sider } = AntLayout

const navItems = [
    { name: 'Profile', icon: <ProfileOutlined /> },
    { name: 'Users', icon: <UserOutlined /> },
    { name: 'Messages', icon: <MessageOutlined /> },
]

const items2 = navItems.map((item) => {
    return {
        key: item.name,
        icon: item.icon,
        label: item.name,
    }
})

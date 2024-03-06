import { Outlet, useNavigate } from 'react-router-dom'

import {
    UserOutlined,
    ProfileOutlined,
    MessageOutlined,
} from '@ant-design/icons'
import { Layout as AntLayout, Menu } from 'antd'
import { useMeQuery } from '../services/auth/auth.service'
import { Toast } from '../components/ui/toast'

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
                    items={menuItems}
                    onClick={({ keyPath }) =>
                        handleNavMenuClick(keyPath[0].toLocaleLowerCase())
                    }
                />
            </Sider>
            <Outlet />
            <Toast />
        </AntLayout>
    )
}

const { Sider } = AntLayout

const navItems = [
    { name: 'Profile', icon: <ProfileOutlined /> },
    { name: 'Users', icon: <UserOutlined /> },
    { name: 'Chat', icon: <MessageOutlined /> },
]

const menuItems = navItems.map((item) => {
    return {
        key: item.name,
        icon: item.icon,
        label: item.name,
    }
})

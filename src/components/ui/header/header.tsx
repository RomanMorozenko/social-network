import { Layout as AntLayout } from 'antd'

import { Logo } from '../../../assets/images/Logo'
import { UserPanel } from './userPanel'

const { Header: AntHeader } = AntLayout

type HeaderPropsType = {
    isAuth: boolean
}

export const Header = ({ isAuth }: HeaderPropsType) => {
    return (
        <AntHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Logo />
            {isAuth && <UserPanel />}
        </AntHeader>
    )
}

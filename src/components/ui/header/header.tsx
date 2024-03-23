import { Layout as AntLayout } from 'antd'
import {
    useLogOutMutation,
    useMeQuery,
} from '../../../services/auth/auth.service'
import s from './header.module.scss'
import { defaultAva } from '../../../assets/images/defaultAva'
import { useLazyGetOwnerProfileQuery } from '../../../services/profile/profile.service'
import { useEffect, useState } from 'react'
import { Logo } from '../../../assets/images/Logo'

const { Header: AntHeader } = AntLayout

type HeaderPropsType = {
    isAuth: boolean
}

export const Header = ({ isAuth }: HeaderPropsType) => {
    return (
        <AntHeader style={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
            {isAuth && <UserPanel />}
        </AntHeader>
    )
}

const UserPanel = () => {
    const [logout] = useLogOutMutation()
    const { data } = useMeQuery()
    const userId = data?.data.id
    const [trigger, { data: profileData }] = useLazyGetOwnerProfileQuery()
    const [isDropDownActive, setIsDropDownActive] = useState(false)

    useEffect(() => {
        userId && trigger(userId.toString())
    }, [userId, trigger])

    const userName = profileData?.fullName
    const userImage =
        profileData?.photos.large || profileData?.photos.small || defaultAva

    const dropDownClass = !isDropDownActive ? s.off : ''

    const handleDropDownToggle = () => {
        setIsDropDownActive(!isDropDownActive)
    }

    const handleLogout = () => {
        logout()
        setIsDropDownActive(false)
    }

    return (
        <div className={s.userPanel}>
            <img
                onClick={handleDropDownToggle}
                className={s.userPhoto}
                src={userImage}
                alt="user photo"
            />
            <p className={s.userName}>{userName}</p>
            <div
                className={s.dropDown + ' ' + dropDownClass}
                onBlur={() => {
                    console.log('blur')
                    setIsDropDownActive(false)
                }}
            >
                <button
                    className={s.logout}
                    onClick={handleLogout}
                    aria-label="logout"
                >
                    logout
                </button>
            </div>
        </div>
    )
}

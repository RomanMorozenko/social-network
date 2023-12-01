import { Layout as AntLayout } from 'antd'
import {
    useLogOutMutation,
    useMeQuery,
} from '../../../services/auth/auth.service'
import s from './header.module.scss'
import { defaultAva } from '../../../assets/images/defaultAva'
import { useLazyGetOwnerProfileQuery } from '../../../services/profile/profile.service'
import { useEffect } from 'react'

const { Header: AntHeader } = AntLayout

type HeaderPropsType = {
    isAuth: boolean
}

export const Header = ({ isAuth }: HeaderPropsType) => {
    return (
        <AntHeader style={{ display: 'flex', alignItems: 'center' }}>
            {isAuth ? <UserPanel /> : <></>}
        </AntHeader>
    )
}

const UserPanel = () => {
    const [logout] = useLogOutMutation()
    const { data } = useMeQuery()
    const userId = data?.data.id
    const [trigger, { data: profileData }] = useLazyGetOwnerProfileQuery()

    useEffect(() => {
        userId && trigger(userId.toString())
    }, [userId, trigger])

    const userName = profileData?.fullName
    const userImage =
        profileData?.photos.large || profileData?.photos.small || defaultAva

    return (
        <div className={s.userPanel}>
            <img className={s.userPhoto} src={userImage} alt="user photo" />
            <p className={s.userName}>{userName}</p>
            <button onClick={() => logout()}>logout</button>
        </div>
    )
}

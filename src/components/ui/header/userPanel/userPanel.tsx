import { useEffect, useState } from 'react'
import {
    useLogOutMutation,
    useMeQuery,
} from '../../../../services/auth/auth.service'
import { useLazyGetOwnerProfileQuery } from '../../../../services/profile/profile.service'
import { defaultAva } from '../../../../assets/images/defaultAva'
import s from './userPanel.module.scss'

export const UserPanel = () => {
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
            <p className={s.userName}>{userName}</p>
            <img
                onClick={handleDropDownToggle}
                className={s.userPhoto}
                src={userImage}
                alt="user photo"
            />
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

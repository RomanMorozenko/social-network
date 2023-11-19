import { useState } from 'react'
import { useEffect } from 'react'
import { EditableSpan } from '../../components/ui/editableSpan'
import { useMeQuery } from '../../services/auth/auth.service'
import s from './profile.module.scss'
import { useParams } from 'react-router'
import {
    UserProfileType,
    useLazyGetUserProfileQuery,
    useLazyGetUserStatusQuery,
} from '../../services/profile/profile.service'

export const Profile = () => {
    const [triggerUserProfile, { data: profileData }] =
        useLazyGetUserProfileQuery()
    const [triggerUserStatus, { data: statusData }] =
        useLazyGetUserStatusQuery()
    const { data: meData } = useMeQuery()

    const id = useParams().id || meData?.data.id

    const [currentUserProfile, setCurrentUserProfile] =
        useState<UserProfileType>()

    useEffect(() => {
        id && triggerUserProfile(id.toString())
        id && triggerUserStatus(id.toString())
    }, [triggerUserProfile, triggerUserStatus, id])

    useEffect(() => {
        profileData && setCurrentUserProfile(profileData)
    }, [profileData])

    return (
        <div className={s.profileContainer}>
            <div className={s.profile}>
                <div className={s.userInfo}>
                    <img
                        src={currentUserProfile?.photos.large}
                        alt="user image"
                        className={s.userImage}
                    />
                    <div className={s.lookingForAJob}></div>
                    <div className={s.contacts}></div>
                </div>
            </div>
            <div className={s.userName}>
                <EditableSpan value={currentUserProfile?.fullName || ''} />
            </div>
            <div className={s.userStatus}>
                <EditableSpan value={statusData || ''} />
            </div>
            <div className={s.feed}></div>
        </div>
    )
}

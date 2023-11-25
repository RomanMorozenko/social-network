import { useState } from 'react'
import { useEffect } from 'react'
import { EditableSpan } from '../../components/ui/editableSpan'
import { useMeQuery } from '../../services/auth/auth.service'
import s from './profile.module.scss'
import { useParams } from 'react-router'
import {
    useLazyGetUserProfileQuery,
    useLazyGetUserStatusQuery,
    useUpdateStatusMutation,
} from '../../services/profile/profile.service'
import { defaultAva } from '../../assets/images/defaultAva'
import { ContactsList } from './contactsList'
import { UserProfileType } from '../../services/profile/profileTypes'
import { AppDispatch, useAppSelector } from '../../services/store'
import { updateProfileThunk } from '../../services/profile/profileSlice'
import { useDispatch } from 'react-redux'

export const Profile = () => {
    const [updateStatus] = useUpdateStatusMutation()

    const [triggerUserProfile] = useLazyGetUserProfileQuery()

    const [triggerUserStatus, { data: statusData }] =
        useLazyGetUserStatusQuery()
    const { data: meData } = useMeQuery()

    const profileData = useAppSelector((state) => state.profileReducer)

    const dispatch: AppDispatch = useDispatch()

    const ownerID = meData?.data.id

    const profileToShow = useParams().id || ownerID

    const [currentUserProfile, setCurrentUserProfile] =
        useState<UserProfileType>()

    useEffect(() => {
        profileToShow && triggerUserProfile(profileToShow.toString())
        profileToShow && triggerUserStatus(profileToShow.toString())
    }, [triggerUserProfile, triggerUserStatus, profileToShow])

    useEffect(() => {
        profileData && setCurrentUserProfile(profileData)
    }, [profileData])

    const handleUpdateStatus = (arg: string) => {
        updateStatus(arg)
    }

    const handleUpdateProfile = (arg: string) => {
        dispatch(updateProfileThunk({ fullName: arg, userId: ownerID }))
    }

    if (!currentUserProfile) return

    return (
        <div className={s.profileContainer}>
            <div className={s.profile}>
                <div className={s.userInfo}>
                    <img
                        src={currentUserProfile?.photos.large || defaultAva}
                        alt="user image"
                        className={s.userImage}
                    />
                    <div className={s.lookingForAJob}>
                        <p>Is looking for a job?</p>
                        {currentUserProfile?.lookingForAJob
                            ? currentUserProfile?.lookingForAJobDescription
                            : "I'm currently not looking for a job"}
                    </div>
                    <ContactsList contacts={currentUserProfile?.contacts} />
                </div>
            </div>
            <div className={s.userNameContainer}>
                {ownerID === profileToShow ? (
                    <EditableSpan
                        as="span"
                        // style={s.userName}
                        value={currentUserProfile?.fullName || ''}
                        callback={handleUpdateProfile}
                    />
                ) : (
                    <div>{currentUserProfile?.fullName}</div>
                )}
            </div>
            <div className={s.userStatusContainer}>
                {ownerID === profileToShow ? (
                    <EditableSpan
                        as="span"
                        value={statusData || ''}
                        callback={handleUpdateStatus}
                    />
                ) : (
                    <div>{statusData}</div>
                )}
            </div>
            <div className={s.feed}></div>
        </div>
    )
}

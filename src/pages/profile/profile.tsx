import { useState, useEffect } from 'react'
import { useMeQuery } from '../../services/auth/auth.service'
import s from './profile.module.scss'
import { useParams } from 'react-router'
import {
    useLazyGetUserProfileQuery,
    useLazyGetUserStatusQuery,
} from '../../services/profile/profile.service'
import { ContactsList } from './contactsList'
import { UserProfileType } from '../../services/profile/profileTypes'
import { useAppSelector } from '../../services/store'
import { UserName } from './userName'
import { UserStatus } from './userStatus'
import { UserPhotoPanel } from './userPhotoPanel'

export const Profile = () => {
    const [triggerUserProfile] = useLazyGetUserProfileQuery()
    const [triggerUserStatus, { data: statusData }] =
        useLazyGetUserStatusQuery()
    const { data: meData } = useMeQuery()
    const profileData = useAppSelector((state) => state.profileReducer)
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

    if (!currentUserProfile) return null

    return (
        <div className={s.profileContainer}>
            <div className={s.profile}>
                <div className={s.userInfo}>
                    <UserPhotoPanel
                        photo={currentUserProfile.photos.large || ''}
                    />
                    <div className={s.lookingForAJob}>
                        {currentUserProfile?.lookingForAJob
                            ? currentUserProfile?.lookingForAJobDescription
                            : "I'm currently not looking for a job"}
                    </div>
                    <ContactsList
                        className={s.contactsContainer}
                        contacts={currentUserProfile?.contacts}
                    />
                </div>
            </div>
            <UserName
                ownerID={ownerID}
                profileToShow={profileToShow}
                currentUserProfile={currentUserProfile}
            />
            <UserStatus
                ownerID={ownerID}
                statusData={statusData}
                profileToShow={profileToShow}
            />
            <div className={s.feed}></div>
        </div>
    )
}

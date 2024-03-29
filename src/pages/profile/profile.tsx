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
import {
    UserType,
    useLazyGetUsersQuery,
} from '../../services/users/users.service'
import { UserCard } from '../users/userCard'

export const Profile = () => {
    const [triggerUserProfile] = useLazyGetUserProfileQuery()
    const [triggerUserStatus, { data: statusData }] =
        useLazyGetUserStatusQuery()
    const { data: meData } = useMeQuery()
    const [trigger, { data }] = useLazyGetUsersQuery({})
    const profileData = useAppSelector((state) => state.profileReducer)
    const ownerID = meData?.data.id
    const profileToShow = useParams().id || ownerID
    const [currentUserProfile, setCurrentUserProfile] =
        useState<UserProfileType>()
    const isOwner = profileToShow === ownerID

    useEffect(() => {
        trigger({ friend: true })
    }, [trigger])

    useEffect(() => {
        profileToShow && triggerUserProfile(profileToShow.toString())
        profileToShow && triggerUserStatus(profileToShow.toString())
    }, [triggerUserProfile, triggerUserStatus, profileToShow])

    useEffect(() => {
        profileData && setCurrentUserProfile(profileData)
    }, [profileData])

    const friends = data?.items

    if (!currentUserProfile) return null

    return (
        <div className={s.profileContainer}>
            <div className={s.profile}>
                <div className={s.userInfo}>
                    <UserPhotoPanel
                        isOwner={isOwner}
                        photo={currentUserProfile.photos.large || ''}
                    />
                    <div className={s.lookingForAJob}>
                        {currentUserProfile?.lookingForAJob
                            ? currentUserProfile?.lookingForAJobDescription
                            : "I'm currently not looking for a job"}
                    </div>
                    <ContactsList
                        isOwner={isOwner}
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
            <div className={s.friendsContainer}>
                {isOwner &&
                    friends?.map((fr: UserType) => {
                        return (
                            <UserCard
                                key={fr.id}
                                page="profile"
                                avatar={fr.photos.small || ''}
                                name={fr.name}
                                followed={fr.followed}
                                id={fr.id}
                            />
                        )
                    })}
                {!isOwner && <div>You can't see who other users follow.</div>}
            </div>
        </div>
    )
}

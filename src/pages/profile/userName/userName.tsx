import { useDispatch } from 'react-redux'
import { updateProfileThunk } from '../../../services/profile/profileSlice'
import { UserProfileType } from '../../../services/profile/profileTypes'
import { EditableSpan } from '../../../components/ui/editableSpan'
import { AppDispatch } from '../../../services/store'
import s from './userName.module.scss'

type UserName = {
    ownerID: string | number | undefined
    profileToShow: string | number | undefined
    currentUserProfile: UserProfileType | undefined
}

export const UserName = ({
    ownerID,
    profileToShow,
    currentUserProfile,
}: UserName) => {
    const dispatch: AppDispatch = useDispatch()
    const handleUpdateProfile = (arg: string) => {
        dispatch(
            updateProfileThunk({
                fullName: arg,
            })
        )
    }
    return (
        <div className={s.userNameContainer}>
            {ownerID === profileToShow ? (
                <EditableSpan
                    as="span"
                    className={s.userName}
                    value={currentUserProfile?.fullName || ''}
                    callback={handleUpdateProfile}
                    showEditIcon={true}
                />
            ) : (
                <div>{currentUserProfile?.fullName}</div>
            )}
        </div>
    )
}

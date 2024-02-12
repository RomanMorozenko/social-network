import { EditableSpan } from '../../../components/ui/editableSpan'
import { useUpdateStatusMutation } from '../../../services/profile/profile.service'
import s from './userStatus.module.scss'

type UserStatus = {
    ownerID: string | number | undefined
    statusData: string | undefined
    profileToShow: string | number | undefined
}

export const UserStatus = ({
    ownerID,
    statusData,
    profileToShow,
}: UserStatus) => {
    const [updateStatus] = useUpdateStatusMutation()
    const handleUpdateStatus = (arg: string) => {
        updateStatus(arg)
    }
    return (
        <div className={s.userStatusContainer}>
            {ownerID === profileToShow ? (
                <EditableSpan
                    as="span"
                    className={s.userStatus}
                    value={statusData || ''}
                    callback={handleUpdateStatus}
                    showEditIcon={true}
                />
            ) : (
                <div>{statusData}</div>
            )}
        </div>
    )
}

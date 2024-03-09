import { ChangeEvent, useRef } from 'react'
import { useUpdatePhotoMutation } from '../../../services/profile/profile.service'
import { CameraOutlined } from '@ant-design/icons'
import { defaultAva } from '../../../assets/images/defaultAva'
import s from './userPhotoPanel.module.scss'

type UserPhotoPanel = {
    photo: string
    isOwner: boolean
}

export const UserPhotoPanel = ({ photo, isOwner }: UserPhotoPanel) => {
    const [updatePhoto] = useUpdatePhotoMutation()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            const formData = new FormData()

            file && formData.append('avatar', file)

            // setIsAvatarUpdating(true)
            await updatePhoto(formData)
            // setIsAvatarUpdating(false)
        }
    }

    const handleUpdateImageClick = () => {
        inputRef && inputRef.current?.click()
    }

    return (
        <div className={s.userPhotoContainer}>
            <img
                src={photo || defaultAva}
                alt="user image"
                className={s.userImage}
            />
            <input
                type="file"
                className={s.photoInput}
                ref={inputRef}
                onChange={(e) => handleUpload(e)}
            />
            <CameraOutlined
                onClick={handleUpdateImageClick}
                className={s.photoEditIcon}
                style={{ visibility: isOwner ? 'visible' : 'hidden' }}
            />
        </div>
    )
}

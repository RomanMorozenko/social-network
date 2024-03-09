import {
    GithubOutlined,
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
    CodeOutlined,
    YoutubeOutlined,
    EditOutlined,
} from '@ant-design/icons'

import s from './contactsList.module.scss'
import { useState } from 'react'
import { useMeQuery } from '../../../services/auth/auth.service'
import { EditableSpan } from '../../../components/ui/editableSpan'
import { UserProfileType } from '../../../services/profile/profileTypes'
import { AppDispatch } from '../../../services/store'
import { useDispatch } from 'react-redux'
import { updateProfileThunk } from '../../../services/profile/profileSlice'

type ContactsListPropsType = Pick<UserProfileType, 'contacts'> & {
    className?: string
    isOwner: boolean
}

const Icons = {
    github: <GithubOutlined />,
    vk: null,
    facebook: <FacebookOutlined />,
    instagram: <InstagramOutlined />,
    twitter: <TwitterOutlined />,
    website: <CodeOutlined />,
    youtube: <YoutubeOutlined />,
}

export const ContactsList = ({
    contacts,
    className,
    isOwner,
}: ContactsListPropsType) => {
    return (
        <div className={s.contacts + ' ' + className}>
            {Object.entries(contacts).map(([key, value]) => {
                if (key.toLocaleLowerCase() === 'mainlink') return
                return (
                    <Contact
                        isOwner={isOwner}
                        key={key}
                        name={key as ContactPropsType['name']}
                        value={value || ''}
                    />
                )
            })}
        </div>
    )
}

type ContactPropsType = {
    name:
        | 'github'
        | 'vk'
        | 'facebook'
        | 'instagram'
        | 'twitter'
        | 'website'
        | 'youtube'
    value: string
    isOwner: boolean
}

const Contact = ({ name, value, isOwner }: ContactPropsType) => {
    const dispatch: AppDispatch = useDispatch()
    const { data: meData } = useMeQuery()

    const ownerID = meData?.data.id

    const [editMode, setEditMode] = useState(false)

    const handleContactEdit = (value: string) => {
        if (!ownerID) return
        dispatch(
            updateProfileThunk({
                [name]: value,
            })
        )
        setEditMode(false)
    }

    return (
        <div className={s.contact}>
            <span className={s.icon}>{Icons[name] ? Icons[name] : name}</span>
            <EditableSpan
                as="a"
                value={value}
                callback={handleContactEdit}
                outerEditMode={editMode}
                href={`https://${value}`}
                target="_blank"
                rel="noreferrer noopener"
            />
            <EditOutlined
                style={{ visibility: isOwner ? 'visible' : 'hidden' }}
                onClick={() => setEditMode(!editMode)}
            />
        </div>
    )
}

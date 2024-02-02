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
}

const Icons = {
    github: <GithubOutlined />,
    vk: null,
    facebook: <FacebookOutlined />,
    instagram: <InstagramOutlined />,
    twitter: <TwitterOutlined />,
    website: <CodeOutlined />,
    youtube: <YoutubeOutlined />,
    mainLink: null,
}

export const ContactsList = ({
    contacts,
    className,
}: ContactsListPropsType) => {
    return (
        <div className={s.contacts + ' ' + className}>
            {Object.entries(contacts).map(([key, value]) => {
                return (
                    <Contact
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
        | 'mainLink'
    value: string
}

const Contact = ({ name, value }: ContactPropsType) => {
    const dispatch: AppDispatch = useDispatch()
    const { data: meData } = useMeQuery()

    const ownerID = meData?.data.id

    const [editMode, setEditMode] = useState(false)

    const handleContactEdit = (value: string) => {
        if (!ownerID) return
        dispatch(
            updateProfileThunk({
                contacts: { [name]: value },
                userId: ownerID,
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
            <EditOutlined onClick={() => setEditMode(!editMode)} />
        </div>
    )
}

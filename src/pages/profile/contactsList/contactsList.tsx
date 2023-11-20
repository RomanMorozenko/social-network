import {
    UserProfileType,
    useUpdateProfileMutation,
} from '../../../services/profile/profile.service'

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

type ContactsListPropsType = Pick<UserProfileType, 'contacts'>

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

export const ContactsList = ({ contacts }: ContactsListPropsType) => {
    return (
        <div className={s.contacts}>
            {Object.entries(contacts).map(([key, value]) => {
                return <Contact key={key} name={key} value={value || ''} />
            })}
        </div>
    )
}

type ContactPropsType = {
    name: string
    value: string
}

const Contact = ({ name, value }: ContactPropsType) => {
    const [updateProfile] = useUpdateProfileMutation()
    const { data: meData } = useMeQuery()

    const ownerID = meData?.data.id

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(value)

    const handleContactEdit = () => {
        if (!ownerID) return
        updateProfile({ [name]: value, userId: ownerID })
        setEditMode(false)
    }

    return (
        <div className={s.contact}>
            <span className={s.icon}>
                {
                    // @ts-expect-errorignore
                    Icons[name] ? Icons[name] : name
                }
            </span>
            :{' '}
            {editMode ? (
                <input
                    type="text"
                    onBlur={handleContactEdit}
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            ) : (
                <>
                    <a className={s.link} href={value || ''}>
                        {value}
                    </a>
                    <EditOutlined
                        className={s.editIcon}
                        onClick={() => setEditMode(true)}
                    />
                </>
            )}
        </div>
    )
}

import {
    UserType,
    useFollowUserMutation,
    useLazyGetUsersQuery,
    useUnfollowUserMutation,
} from '../../services/users/users.service'
import { Button } from 'antd'

import s from './users.module.scss'
import { Pagination } from './pagination/pagination'
import { useEffect, useState } from 'react'

export const Users = () => {
    const [trigger, { data }] = useLazyGetUsersQuery({})
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        trigger({})
    }, [trigger])

    const users = data?.items
    const totalUsersCount = data?.totalCount

    const handlePageClick = (count: number, page: number) => {
        console.log('page click')
        trigger({ count, page })
    }

    const handleInputValueChange = (value: string) => {
        setInputValue(value)
        trigger({ term: value })
    }

    return (
        <div className={s.usersContainer}>
            <div className={s.searchBar}>
                <h2>Users</h2>
                <Input value={inputValue} setValue={handleInputValueChange} />
            </div>
            <div className={s.pageControlPanel}>
                <Pagination
                    totalUsersCount={totalUsersCount || 0}
                    onClick={handlePageClick}
                />
                <div className={s.dropDown}></div>
            </div>
            <div className={s.usersDisplay}>
                {users?.map((user: UserType) => (
                    <UserCard
                        key={user.id}
                        avatar={user.photos.small || ''}
                        name={user.name}
                        followed={user.followed}
                        id={user.id}
                    />
                ))}
            </div>
        </div>
    )
}

type UserCardPropsType = {
    avatar: string
    name: string
    followed: boolean
    id: number
}

const defaultAvatar = '../src/assets/images/anonym.jpeg'

const UserCard = ({ avatar, name, followed, id }: UserCardPropsType) => {
    const [followUser] = useFollowUserMutation()
    const [unfollowUser] = useUnfollowUserMutation()

    const handleFollowUnfollow = (followed: boolean, id: number) => {
        if (followed) {
            unfollowUser(id)
        } else {
            followUser(id)
        }
    }

    return (
        <div className={s.userCard}>
            <img
                src={avatar || defaultAvatar}
                alt=""
                className={s.userAvatar}
            />
            <div className={s.userName}>{name}</div>
            <div className={s.buttonContainer}>
                <Button
                    type="primary"
                    block
                    onClick={() => handleFollowUnfollow(followed, id)}
                >
                    {followed ? 'Unfollow' : 'Follow'}
                </Button>
            </div>
        </div>
    )
}

type InputPropsType = {
    value: string
    setValue: (value: string) => void
}

const Input = ({ value, setValue }: InputPropsType) => {
    return (
        <input
            className={s.searchInput}
            type="text"
            placeholder={'search for users...'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

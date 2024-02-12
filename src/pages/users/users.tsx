import {
    UserType,
    useLazyGetUsersQuery,
} from '../../services/users/users.service'
import { Checkbox } from 'antd'

import s from './users.module.scss'
import { Pagination } from './pagination/pagination'
import { useCallback, useEffect, useState } from 'react'
import { UserCard } from './userCard'

export const Users = () => {
    console.log('Users rendered ')
    const [trigger, { data }] = useLazyGetUsersQuery({})
    const [inputValue, setInputValue] = useState('')
    const [showFriends, setShowFriends] = useState(false)
    const [debounceTimer, setDebounceTimer] = useState<number | null>(null)
    console.log(data)

    useEffect(() => {
        console.log(useEffect)
        trigger({})
    }, [trigger])

    useEffect(() => {
        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer)
            }
        }
    }, [debounceTimer])

    const users = data?.items
    const totalUsersCount = data?.totalCount

    const handlePageClick = useCallback(
        (count: number, page: number) => {
            trigger({ count, page })
        },
        [trigger]
    )

    const handleInputValueChange = (value: string) => {
        setInputValue(value)
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
        const newTimer = setTimeout(() => {
            trigger({ term: value, friend: showFriends })
        }, 300)

        setDebounceTimer(newTimer)
    }

    const onChange = () => {
        if (!showFriends) {
            setShowFriends(true)
            trigger({ friend: true })
        } else {
            setShowFriends(false)
            trigger({})
        }
    }

    return (
        <div className={s.usersContainer}>
            <div className={s.searchBar}>
                <h2>Users</h2>
                <Checkbox onChange={onChange}>Show friends only</Checkbox>
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
                {users?.map(
                    (user: UserType) => (
                        console.log('user rendered'),
                        (
                            <UserCard
                                key={user.id}
                                avatar={user.photos.small || ''}
                                name={user.name}
                                followed={user.followed}
                                id={user.id}
                            />
                        )
                    )
                )}
            </div>
        </div>
    )
}

type Input = {
    value: string
    setValue: (value: string) => void
}

const Input = ({ value, setValue }: Input) => {
    console.log('Input rendered')
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

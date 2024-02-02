import { Button } from 'antd'
import {
    useFollowUserMutation,
    useUnfollowUserMutation,
} from '../../../services/users/users.service'
import s from './userCard.module.scss'

type UserCardPropsType = {
    avatar: string
    name: string
    followed: boolean
    id: number
}

const defaultAvatar = '../src/assets/images/anonym.jpeg'

export const UserCard = ({ avatar, name, followed, id }: UserCardPropsType) => {
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

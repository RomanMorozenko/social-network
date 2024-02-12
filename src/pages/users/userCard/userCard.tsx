import { Button } from 'antd'
import {
    useFollowUserMutation,
    useUnfollowUserMutation,
} from '../../../services/users/users.service'
import s from './userCard.module.scss'
import { Link } from 'react-router-dom'

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
            <Link className={s.avatarContainer} to={`/profile/${id}`}>
                <img
                    src={avatar || defaultAvatar}
                    alt=""
                    className={s.userAvatar}
                />
            </Link>
            <Link className={s.nameConrainer} to={`/profile/${id}`}>
                <div className={s.name}>{name}</div>
            </Link>
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

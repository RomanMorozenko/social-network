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
    page: 'profile' | 'users'
}

const defaultAvatar = '../src/assets/images/anonym.jpeg'

export const UserCard = ({
    avatar,
    name,
    followed,
    id,
    page,
}: UserCardPropsType) => {
    const [followUser] = useFollowUserMutation()
    const [unfollowUser] = useUnfollowUserMutation()

    const handleFollowUnfollow = (followed: boolean, id: number) => {
        if (followed) {
            unfollowUser(id)
        } else {
            followUser(id)
        }
    }

    const cardClassName = page === 'users' ? s.userCardUsers : s.userCardProfile

    return (
        <div className={cardClassName}>
            <Link className={s.avatarContainer} to={`/profile/${id}`}>
                <img
                    src={avatar || defaultAvatar}
                    alt=""
                    className={s.userAvatar}
                />
            </Link>
            <Link className={s.nameConrainer} to={`/profile/${id}`}>
                {name}
            </Link>
            <div className={s.buttonContainer}>
                <Button
                    type="primary"
                    style={{ backgroundColor: '#001529' }}
                    block
                    onClick={() => handleFollowUnfollow(followed, id)}
                >
                    {followed ? 'Unfollow' : 'Follow'}
                </Button>
            </div>
        </div>
    )
}

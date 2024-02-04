import { Skeleton } from './skeleton'
import s from '../../pages/users/userCard/userCard.module.scss'

export const SkeletonUserPage = () => {
    return (
        <div className={s.userCard}>
            <Skeleton classType="avatar" />
            <Skeleton classType="name" />
            <Skeleton classType="button" />
        </div>
    )
}

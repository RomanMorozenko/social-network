import { useGetUsersQuery } from '../../services/users/users.service'

export const Users = () => {
    const { getUsers } = useGetUsersQuery({})

    console.log(getUsers)

    return <div>Users</div>
}

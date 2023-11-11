import { baseApi } from '../base-api'

export const UsersService = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            getUsers: builder.query<GetUsersResponseType, GetUsersArgsType>({
                query: (body) => ({
                    url: '/users',
                    method: 'GET',
                    body,
                }),
                providesTags: ['Users'],
            }),
        }
    },
})

export const { useGetUsersQuery } = UsersService

export type GetUsersArgsType = {
    count?: number
    page?: number
    term?: string
    friend?: boolean
}

export type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export type UserType = {
    name: string
    id: number
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
    followed: boolean
}

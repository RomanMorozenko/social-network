import { baseApi } from '../base-api'

export const UsersService = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            getUsers: builder.query<GetUsersResponseType, GetUsersArgsType>({
                query: ({ count = 10, page = 1, term = '', friend }) => ({
                    url: `/users?count=${count}&page=${page}&term=${term}&friend=${friend}`,
                    method: 'GET',
                }),
                providesTags: ['Users'],
            }),
            followUser: builder.mutation<FollowUnfollowResponseType, number>({
                query: (id) => ({
                    url: `/follow/${id}`,
                    method: 'POST',
                }),
                invalidatesTags: ['Users'],
            }),
            unfollowUser: builder.mutation<FollowUnfollowResponseType, number>({
                query: (id) => ({
                    url: `/follow/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Users'],
            }),
        }
    },
})

export const {
    useLazyGetUsersQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
} = UsersService

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

export type FollowUnfollowResponseType = {
    resultCode: number
    messages: string[]
    data: object
}

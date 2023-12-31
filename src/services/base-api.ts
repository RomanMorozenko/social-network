import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Users', 'Profile', 'Me'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0',
        credentials: 'include',
    }),
    endpoints: () => ({}),
})

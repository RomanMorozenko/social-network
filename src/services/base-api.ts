import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import {
    BaseQueryApi,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'

type ApiResponse = {
    resultCode?: number
    messages?: string[]
}

const baseQuery =
    (baseQueryOptions: FetchBaseQueryArgs) =>
    async (args: FetchArgs, api: BaseQueryApi, extraOptions: object) => {
        const result = await fetchBaseQuery(baseQueryOptions)(
            args,
            api,
            extraOptions
        )

        const data = result.data as ApiResponse

        if (data.resultCode) {
            toast.warn(data.messages?.[0])
        }

        return result
    }

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Users', 'Profile', 'Me'],
    baseQuery: baseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0',
        credentials: 'include',
    }),
    endpoints: () => ({}),
})

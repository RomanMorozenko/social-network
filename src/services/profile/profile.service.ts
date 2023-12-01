import { baseApi } from '../base-api'
import {
    UpdateProfileRequestType,
    UpdateProfileResponseType,
    UserProfileType,
} from './profileTypes'

export const ProfileService = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            getUserProfile: builder.query<UserProfileType, string>({
                query: (userId) => ({
                    url: `/profile/${userId}`,
                    method: 'GET',
                }),
                providesTags: ['Profile'],
            }),
            getUserStatus: builder.query<string, string>({
                query: (userId) => ({
                    url: `/profile/status/${userId}`,
                    method: 'GET',
                }),
                providesTags: ['Profile'],
            }),
            updateStatus: builder.mutation<UpdateProfileResponseType, string>({
                query: (status) => ({
                    url: '/profile/status',
                    method: 'PUT',
                    body: {
                        status,
                    },
                }),
                invalidatesTags: ['Profile'],
            }),
            updateProfile: builder.mutation<
                UpdateProfileResponseType,
                UpdateProfileRequestType
            >({
                query: (body) => ({
                    url: '/profile',
                    method: 'PUT',
                    body,
                }),
                invalidatesTags: ['Profile'],
            }),
            getOwnerProfile: builder.query<UserProfileType, string>({
                query: (userId) => ({
                    url: `/profile/${userId}`,
                    method: 'GET',
                }),
            }),
        }
    },
})

export const {
    useLazyGetOwnerProfileQuery,
    useLazyGetUserProfileQuery,
    useLazyGetUserStatusQuery,
    useUpdateStatusMutation,
    useUpdateProfileMutation,
} = ProfileService

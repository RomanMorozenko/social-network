import { baseApi } from '../base-api'

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
        }
    },
})

export const { useLazyGetUserProfileQuery, useLazyGetUserStatusQuery } =
    ProfileService

export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

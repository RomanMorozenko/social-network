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
                    body: {
                        userId: null,
                        AboutMe: 'true',
                        lookingForAJob: false,
                        lookingForAJobDescription: 'true',
                        fullName: '',
                        contacts: {
                            github: null,
                            vk: null,
                            facebook: null,
                            instagram: null,
                            twitter: null,
                            website: null,
                            youtube: null,
                            mainLink: null,
                        },
                        ...body,
                    },
                }),
                invalidatesTags: ['Profile'],
            }),
        }
    },
})

export const {
    useLazyGetUserProfileQuery,
    useLazyGetUserStatusQuery,
    useUpdateStatusMutation,
    useUpdateProfileMutation,
} = ProfileService

export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: {
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
        mainLink: string | null
    }
    photos: {
        small: string | null
        large: string | null
    }
}

export type UpdateProfileRequestType = Partial<Omit<UserProfileType, 'photos'>>

export type UpdateProfileResponseType = {
    resultCode: number
    messages: string[]
    data: object
}

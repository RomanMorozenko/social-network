import { baseApi } from '../base-api'

export const AuthService = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            me: builder.query<MeResponseType, void>({
                query: () => ({
                    url: '/auth/me',
                    method: 'GET',
                }),
                providesTags: ['Me'],
            }),
            logIn: builder.mutation<LoginResponseType, LoginArgsType>({
                query: (body) => ({
                    url: '/auth/login',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Me'],
            }),
            logOut: builder.mutation<LogoutResponseType, void>({
                query: () => ({
                    url: '/auth/login',
                    method: 'DELETE',
                }),
                invalidatesTags: ['Me'],
            }),
        }
    },
})

export const { useMeQuery, useLogInMutation, useLogOutMutation } = AuthService

export type MeResponseType = {
    resultCode: number
    messages: string[]
    data: {
        id: number
        email: string
        login: string
    }
}

export type LoginArgsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type LoginResponseType = {
    resultCode: number
    messages: string[]
    data: {
        userId: number
    }
}

export type LogoutResponseType = {
    resultCode: number
    messages: string[]
    data: object
}

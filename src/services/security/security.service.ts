import { baseApi } from '../base-api'

export const securityService = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            getCaptcha: builder.query<{ url: string }, void>({
                query: () => ({
                    url: '/security/get-captcha-url',
                    method: 'GET',
                }),
            }),
        }
    },
})

export const { useLazyGetCaptchaQuery } = securityService

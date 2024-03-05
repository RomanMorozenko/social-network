import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Message = {
    message: string
    photo: string | null
    userId: number
    userName: string
}

const SOCKET_URL =
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

let ws: WebSocket | null = null

export const chatApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: SOCKET_URL,
    }),
    endpoints: (builder) => ({
        connect: builder.query({
            queryFn: async () => {
                const ws = new WebSocket(SOCKET_URL)

                return new Promise((resolve, reject) => {
                    ws.addEventListener('open', () => {
                        console.log('open')
                    })

                    ws.addEventListener('message', (event) => {
                        const data = JSON.parse(event.data)
                        resolve({ data })
                    })

                    ws.addEventListener('error', (error) => {
                        reject(error)
                    })
                })
            },
            async onCacheEntryAdded(_, { updateCachedData }) {
                const connectWebSocket = async () => {
                    ws = new WebSocket(SOCKET_URL)

                    ws.addEventListener('message', (event) => {
                        const data = JSON.parse(event.data)
                        updateCachedData((draft) => {
                            draft.push(data)
                        })
                    })
                }
                connectWebSocket()
            },
        }),
        send: builder.mutation({
            queryFn: async (message) => {
                return new Promise((_, reject) => {
                    ws?.send(message)

                    ws?.addEventListener('error', (error) => {
                        reject(error)
                    })
                })
            },
        }),
    }),
})

export const { useConnectQuery, useSendMutation } = chatApi

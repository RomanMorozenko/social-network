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
                    const handleMessageEvent = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)
                        resolve({ data })
                    }

                    const handleRejectError =
                        () => (error: Event | ErrorEvent) => {
                            reject(error)
                        }

                    ws.addEventListener('message', handleMessageEvent)

                    ws.addEventListener('error', handleRejectError)

                    ws.addEventListener('close', () => {
                        ws.removeEventListener('message', handleMessageEvent)
                        ws.removeEventListener('error', handleRejectError)
                    })
                })
            },
            async onCacheEntryAdded(_, { updateCachedData }) {
                const connectWebSocket = async () => {
                    ws = new WebSocket(SOCKET_URL)

                    const handleMessageEvent = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)
                        updateCachedData((draft) => {
                            draft.push(data)
                        })
                    }

                    ws.addEventListener('message', handleMessageEvent)

                    ws.addEventListener('close', () => {
                        ws?.removeEventListener('message', handleMessageEvent)
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

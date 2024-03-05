import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './base-api'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { profileReducer } from './profile/profileSlice'
import { chatApi } from './chat/chatApi'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        profileReducer,
        [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, chatApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

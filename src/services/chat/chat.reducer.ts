import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
}

const slice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
})

export const chatReducer = slice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { UserProfileType } from './profileTypes'
import { ProfileService } from './profile.service'
import { AppDispatch, RootState } from '../store'

const initialState: UserProfileType = {
    userId: null,
    lookingForAJob: false,
    lookingForAJobDescription: null,
    fullName: '',
    contacts: {
        github: '',
        vk: '',
        facebook: '',
        instagram: '',
        twitter: '',
        website: '',
        youtube: '',
        mainLink: '',
    },
    photos: {
        small: null,
        large: null,
    },
}

const slice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            ProfileService.endpoints.getUserProfile.matchFulfilled,
            (_, action) => {
                return action.payload
            }
        )
    },
})

export const profileReducer = slice.reducer

export const updateProfileThunk = (body: object) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const stateFromSlice = getState().profileReducer

        console.log(stateFromSlice)

        dispatch(
            ProfileService.endpoints.updateProfile.initiate({
                ...stateFromSlice,
                ...body,
            })
        )
    }
}

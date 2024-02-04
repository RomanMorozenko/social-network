import { createSlice } from '@reduxjs/toolkit'
import { UpdateProfileRequestType, UserProfileType } from './profileTypes'
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

type TestType = {
    [key: string]: string
}

export const updateProfileThunk = (
    body: TestType | Partial<UpdateProfileRequestType>
) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const stateFromSlice = getState().profileReducer

        let newContactsData = {}

        if ('contacts' in body) {
            newContactsData = body.contacts ?? {}
        } else {
            newContactsData = body
        }

        dispatch(
            ProfileService.endpoints.updateProfile.initiate({
                ...stateFromSlice,
                fullName: body.fullName || stateFromSlice.fullName,
                contacts: {
                    ...stateFromSlice.contacts,
                    ...newContactsData,
                },
            })
        )
    }
}

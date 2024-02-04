export type UserProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: {
        [key: string]: string
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

export type UpdatePhotoResponseType = {
    resultCode: number
    messages: []
    data: object
}

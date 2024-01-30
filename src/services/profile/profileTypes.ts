export type UserProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: {
        [key: string]: string
        // github: string | null
        // vk: string | null
        // facebook: string | null
        // instagram: string | null
        // twitter: string | null
        // website: string | null
        // youtube: string | null
        // mainLink: string | null
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

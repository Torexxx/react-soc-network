type LocationType = {
    city: string
    country: string
}
type PhotosType = {
    large: string,
    small: string
}
type PostType = {
    id: number
    message: string
    likesCount: number
}
type ContactsType = {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}
type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ContactsType
    photos: PhotosType
}

export interface IUser {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: LocationType
    uniqueUrlName?: any
}

export type {PhotosType, PostType, ContactsType, ProfileType}
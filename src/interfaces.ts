export interface IPost {
    id: number
    message: string
    likesCount: number
}

export interface IDialog {
    id: number
    name: string
}

export interface IMessage{
    id: number
    message: string
}


export interface IUser {
    id: number
    photos: any
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string }
}



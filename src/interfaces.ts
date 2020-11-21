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

export interface IState {
    profilePage: {
        posts: {
            id: number;
            message: string;
            likesCount: number;
        }[];
        newPostText: string;
        profile: any;
    };
    dialogsPage: {
        dialogs: {
            id: number;
            name: string;
        }[];
        messages: {
            id: number;
            message: string;
        }[];
        newMessageText: string;
    };
    usersPage: {
        users: IUser[];
        pageSize: number,
        totalUsersCount: number,
        currentPage: number,
        isFetching: boolean,
        followingInProgress: Array<number>,
    };
    auth: any
}

export interface IUser {
    id: number
    photos: any
    followed: boolean
    name: string
    status: string
    location: {city: string, country: string}
}



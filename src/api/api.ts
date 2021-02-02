import axios, {AxiosResponse} from 'axios';
import {IUser, PhotosType, ProfileType} from "../types/types";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d07e318e-5bc8-4780-b44a-37a9fb87fff6"
    }
})

type GetUsersType = {
    items: Array<IUser>
    totalCount: number
    error: any
};
type SavePhotoType<P> = {
    data: P
    resultCode: number
    messages: Array<string>
};
type FollowUnfollowResponseType = {
    resultCode: number
    messages: Array<string>
    data: { }
};

export const usersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<GetUsersType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(res => res.data)
    },
    unfollow(userId: number) {
            return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`)
    },
    follow(userId: number) {
        return instance.post<FollowUnfollowResponseType>(`follow/${userId}`)
    },
    getProfile(userId: number) {
        // console.warn('use profileAPI.getProfile()');
        return profileAPI.getProfile(userId);

    },
    savePhoto(photoFile: Blob) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<SavePhotoType<PhotosType>>(`profile/photo`, formData)
            .then(res => res.data)
    }
};

type SaveProfileType = {
    resultCode: number
    messages: Array<string>
    data: {}
};
type GetProfileType = ProfileType;
type UpdateStatusType = {
    resultCode: number
    messages: Array<string>
    data: {}
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileType>(`profile/${userId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusType>(`profile/status`, {status})
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<SaveProfileType>(`profile`, profile)
            .then(res => res.data)
    }
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

type MeResponseType = {
    data: {
        id: number
        login: string
        email: string
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
    data: {userId: number}
}
type LogoutResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
            return instance.post<LoginResponseType>(`auth/login`,{email, password, rememberMe, captcha})
                .then(res => res.data)
        },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
            .then(res => res.data)
    },
};

// instance.get<MeResponseType>(`auth/me`).then((res: AxiosResponse<MeResponseType> ) => res.data.data.login)
instance.get<number>(`auth/me`).then((res) => res.data)
// Почему AxiosResponse<T> вместо AxiosResponse<number> ?
type GetCaptchaUrlType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlType>(`security/get-captcha-url`)
            .then(res => res.data)
    }
};

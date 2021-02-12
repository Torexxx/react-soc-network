import {
    instance,
    ResultCodeForCaptchaEnum,
    ResultCodesEnum,
    APIResponseType
} from "./api";


type MeResponseData = {
    id: number
    login: string
    email: string
};
type LoginResponseData = {
    userId: number
};

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseData>>(`auth/me`)
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseData, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`)
            .then(res => res.data)
    },
};
import axios from 'axios';

export let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d07e318e-5bc8-4780-b44a-37a9fb87fff6"
    }
});

export type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
};
export type APIResponseType<D = {}, T = ResultCodesEnum> = {
    data: D
    resultCode: T
    messages: Array<string>
};


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

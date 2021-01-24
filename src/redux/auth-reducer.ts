import {authAPI} from "../api/api";
import {securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA =  'auth/SET_USER_DATA';
const SET_CAPTCHA =  'auth/SET_CAPTCHA';

// export type InitialStateType = {
//     userId: number | null
//     login: string | null
//     email:  string | null
//     isAuth: boolean
//     userAvatar: string | null
//     captchaUrl: string | null
// }

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    userAvatar: null as string | null,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;

// let state: initialStateType = {
//     userId: 1,
//     login: null,
//     email: null,
//     isAuth: false,
//     userAvatar: null,
//     captchaUrl: ''
// }

type ActionType = {
    type: string,
    payload?: {
        newText: string,
        profile: any,
        data: {userId: number, login: string, email: string, userAvatar: string}
    }
}

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:

             return {
                 ...state,
                 ...action.payload,
            }
        case SET_CAPTCHA:

            return {
                userId: 'ДОЛЖНА БЫТЬ ОШИБКА!!! ТАКОГО СВОЙСТВЫА НЕТ В InitialStateType',
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId : number | null
    login: string | null
    email: string | null
    userAvatar: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

const setAuthUserData = (userId: number | null, login: string | null, email: string | null, userAvatar: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload:
        {userId, login, email, userAvatar, isAuth}
});

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.resultCode === 0) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, login, email, null, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0 ) {
        dispatch(getAuthUserData())
    }
    // TODO дублирование
    if (response.resultCode === 1) {
        dispatch(stopSubmit('login', {_error: response.messages[0]}));
    }
    if (response.resultCode === 10) {
        dispatch(getCaptchaUrl())
        dispatch(stopSubmit('login', {_error: response.messages[0]}));
    }
}

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA
    payload: { captchaUrl : string | null }
}
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({type:SET_CAPTCHA, payload: {captchaUrl}});
const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(response.url));
}
export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, null,false))
    }
}

export default authReducer;

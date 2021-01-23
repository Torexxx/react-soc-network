import {authAPI} from "../api/api";
import {securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA =  'auth/SET_USER_DATA';
const SET_CAPTCHA =  'auth/SET_CAPTCHA';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    userAvatar: null,
    captchaUrl: null
};

const authReducer = (state = initialState, action: { type: string, payload?: { newText: string, profile: any, data: {userId: number, login: string, email: string, userAvatar: string }} }) => {

    switch (action.type) {
        case SET_USER_DATA:

             return {
                 ...state,
                 ...action.payload,
            }
        case SET_CAPTCHA:

            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}
const setAuthUserData = (userId: any, login: any, email: any, userAvatar: any, isAuth: boolean, captchaUrl?: string) => ({type: SET_USER_DATA, payload: {userId, login, email, userAvatar, isAuth, captchaUrl}});
// alt + f7 usage
// ctrl + alt+ shift + j - выделиить одинаковые
export const getAuthUserData = () => async (dispatch: any) => {
        let response = await authAPI.me();
        if (response.resultCode === 0) {
            let {id, login, email} = response.data;
            dispatch(setAuthUserData(id, login, email, null, true));
        }
    }
export const login = (email: string, password: any, rememberMe: boolean, captcha?: string) => {
    return async (dispatch: any) => {
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
}
const setCaptchaUrl = (captchaUrl: string) => ({type:SET_CAPTCHA, payload: {captchaUrl} });
const getCaptchaUrl = () => async (dispatch: any) => {
        let response = await securityAPI.getCaptchaUrl();
        dispatch(setCaptchaUrl(response.url));
}
export const logout = () => async (dispatch: any) => {
        let response = await authAPI.logout();
        if (response.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, null,false, ''))
        }
    }

export default authReducer;
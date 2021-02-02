import {authAPI, ResultCodesEnum, ResultCodeForCaptcha} from "../api/api";
import {securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppStateType} from "./redux-store";
import { ThunkAction } from "redux-thunk";

const SET_USER_DATA =  'auth/SET_USER_DATA';
const SET_CAPTCHA =  'auth/SET_CAPTCHA';

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    userAvatar: null as string | null,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;

type ActionsTypes = SetAuthUserDataActionType | SetCaptchaUrlActionType;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
};

type SetAuthUserDataActionPayloadType = {
    userId : number | null
    login: string | null
    email: string | null
    userAvatar: string | null
    isAuth: boolean
};
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
};

const setAuthUserData = (userId: number | null, login: string | null, email: string | null, userAvatar: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload:
        {userId, login, email, userAvatar, isAuth}
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(setAuthUserData(id, login, email, null, true));
    }
};
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        dispatch(stopSubmit('login', {_error: data.messages[0]}));
    }
};
export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, null,false))
    }
}
type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA
    payload?: { captchaUrl : string | null }
};
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({type:SET_CAPTCHA, payload: {captchaUrl}});
const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(data.url));
}

export default authReducer;


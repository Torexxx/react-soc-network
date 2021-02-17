import {ResultCodesEnum, ResultCodeForCaptchaEnum} from "../api/api";
import { stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import { Action } from "redux";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    userAvatar: null as string | null,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/AUTH/SET_USER_DATA":
             return {
                 ...state,
                 ...action.payload,
            }
        case "SN/AUTH/SET_CAPTCHA":
            return {
                ...state,
                ...action,
            }
        default:
            return state;
    }
};

const actions = {
     setAuthUserData: (userId: number | null, login: string | null, email: string | null, userAvatar: string | null, isAuth: boolean) => ({
        type: "SN/AUTH/SET_USER_DATA", payload:
            {userId, login, email, userAvatar, isAuth}
    } as const),
     setCaptchaUrl: (captchaUrl: string) => ({type:"SN/AUTH/SET_CAPTCHA", captchaUrl} as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, login, email, null, true));
    }
};
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        dispatch(stopSubmit('login', {_error: data.messages[0]}));
    }
};
export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, null,false))
    }
};
const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    dispatch(actions.setCaptchaUrl(data.url));
};

export default authReducer;

interface StopSubmitAction extends Action {
    type: ActionsTypes
}
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | StopSubmitAction>;   // ===  ReturnType<typeof stopSubmit>
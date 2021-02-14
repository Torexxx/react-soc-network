import {ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import { BaseThunkType, InferActionTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";
import {FormAction} from "redux-form/lib/actions";

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 1},
        {id: 2, message: 'Hi', likesCount: 1},
    ] as Array<PostType>,
    profile: null as Nullable<ProfileType>,
    status: '',
    newPostText: '',
    profileUpdateStatus: 'none',
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD_POST':
            let newPost = {
                id: Date.now(), message: action.payload.newPostText, likesCount: 1
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            };

        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state, profile: action.payload.profile
            }

        case "SN/PROFILE/SET_STATUS":
            return {
                ...state, status: action.payload.status
            }

        case "SN/PROFILE/DELETE_POST":
            return {
                ...state, posts: state.posts.filter((post) => post.id !== action.payload!.postId)
            }
        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {
                ...state, profile: {...state.profile, photos: action.payload!.photos} as ProfileType
            }
        case "SN/PROFILE/SET_PROFILE_UPDATE_STATUS":
            return {
                ...state, profileUpdateStatus: action.payload.status
            }

        default:
            return state;
    }
};

export const actions = {
    addPostAC:(newPostText: string) => ({type:"SN/PROFILE/ADD_POST", payload: {newPostText}} as const),
    setUserProfile :(profile: ProfileType) => ({type: "SN/PROFILE/SET_USER_PROFILE", payload: {profile}} as const),
    setProfileUpdateStatus: (status: string) => ({type: "SN/PROFILE/SET_PROFILE_UPDATE_STATUS", payload: {status}} as const),
    setStatus : (status: string) => ({type: "SN/PROFILE/SET_STATUS", payload: {status}} as const),
    deletePost :(postId: number) => ({type: "SN/PROFILE/DELETE_POST", payload: {postId}} as const),
    savePhotoSuccess :(photos: PhotosType) => ({type: "SN/PROFILE/SAVE_PHOTO_SUCCESS", payload: {photos, ...photos}} as const),
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(data));
    } catch (err) {
        console.error(err)
    }
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status))
        }
    } catch (err) {
        console.error(err)
    }
}
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.getProfile(userId);
        dispatch(actions.setUserProfile(data))
    } catch (err) {
        console.error(err)
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch) => {
    let data = await profileAPI.saveProfile(profile);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setProfileUpdateStatus('success'));
        dispatch(actions.setUserProfile(profile));
        dispatch(actions.setProfileUpdateStatus('none'));
    } else {
        actions.setProfileUpdateStatus('error');
        const res = data.messages[0].toLowerCase();
        const err = res.substring(res.length - 1, res.indexOf('>') + 1);

        dispatch(stopSubmit('profile-info', {
            'contacts': {
                [err]: data.messages[0]
            }
        }))

        return Promise.reject(data.messages[0]);
    }
};

export default profileReducer;

type Nullable<T> = T | null;
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

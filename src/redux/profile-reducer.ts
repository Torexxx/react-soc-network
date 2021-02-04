import {profileAPI, ResultCodesEnum, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import { ThunkAction } from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST =  'ADD_POST';
const SET_USER_PROFILE =  'SET_USER_PROFILE';
const SET_STATUS =  'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS =  'SAVE_PHOTO_SUCCESS';
const SET_PROFILE_UPDATE_STATUS =  'SET_PROFILE_UPDATE_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 1},
        {id: 2, message: 'Hi', likesCount: 1},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: '',
    profileUpdateStatus: 'none',
}

export type InitialStateType =  typeof initialState;

type ActionsTypes = AddPostACActionType | SetUserProfileActionType | SetProfileUpdateStatusActionType |
    SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: Date.now(), message: action.payload.newPostText, likesCount: 1
            }
             return {
                ...state,
                 newPostText: '',
                 posts: [...state.posts, newPost]
            };

        case SET_USER_PROFILE:
            return {
                ...state, profile: action.payload.profile
            }

        case SET_STATUS:
            return {
                ...state, status: action.payload.status
            }

        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter((post) => post.id !== action.payload!.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.payload!.photos} as ProfileType
            }
        case SET_PROFILE_UPDATE_STATUS:
            return {
                ...state, profileUpdateStatus: action.payload.status
            }

        default:
            return state;
    }
};

type AddPostACActionType = {
    type: typeof ADD_POST
    payload: {
        newPostText: string
    }
};
export const addPostAC = (newPostText: string): AddPostACActionType => ({type: ADD_POST, payload: {newPostText}});
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: {
        profile: ProfileType
    }
};
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, payload: {profile}});

///////////////ReturnType//////////////////////
type SetProfileUpdateStatusActionType = ReturnType<typeof setProfileUpdateStatus>
const setProfileUpdateStatus = (status: string) => ({type: SET_PROFILE_UPDATE_STATUS, payload: {status}} as const);
///////////////ReturnType/////////////////////

type SetStatusActionType = {
    type: typeof SET_STATUS
    payload: {
        status: string
    }
};
const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, payload: {status}});
type DeletePostActionType = {
    type: typeof DELETE_POST
    payload: {
        postId: number
    }
};
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, payload: {postId}});
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    payload?: {
        photos: PhotosType
    }
};

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, payload: {photos, ...photos}});
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        profileAPI.getStatus(userId)
            .then(data => {
                dispatch(setStatus(data))
            })
    }
};
export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        profileAPI.updateStatus(status)
            .then(data => {
                if (data.resultCode === ResultCodesEnum.Success) {
                    dispatch(setStatus(status) )
                }
            })
            .catch((err) => {
                console.error(err);
        })
    }
};
export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
         usersAPI.getProfile(userId)
             .then(data => dispatch(setUserProfile(data)))
    }
};
export const savePhoto = (file: Blob): ThunkType => {
    return async (dispatch) => {
         let data = await usersAPI.savePhoto(file);

         if (data.resultCode === ResultCodesEnum.Success) {
             dispatch(savePhotoSuccess(data.data));
         }
    }
};
export const saveProfile = (profile: ProfileType): ThunkType  => {
    return async (dispatch) => {
        let data = await profileAPI.saveProfile(profile);

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setProfileUpdateStatus('success'));
            dispatch(setUserProfile(profile));
            dispatch(setProfileUpdateStatus('none'));
        }
            else {
                setProfileUpdateStatus('error');
                const res = data.messages[0].toLowerCase();
                const err = res.substring(res.length - 1 , res.indexOf('>') + 1);

                dispatch(stopSubmit('profile-info',{'contacts': {
                        [err]: data.messages[0]
                    }}))

                return Promise.reject(data.messages[0]);
        }
    };
};

export default profileReducer;

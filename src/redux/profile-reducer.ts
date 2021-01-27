import {profileAPI, usersAPI } from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

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

export type InitialStateType =  typeof initialState

type ActionType = {
    type: string,
    payload?:
        {
            newText: string,
            profile: ProfileType,
            status: string,
            newPostText: string,
            postId: number,
            photos: PhotosType
        }
}

const profileReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: Date.now(), message: action.payload!.newPostText, likesCount: 1
            }
             return {
                ...state,
                 newPostText: '',
                 posts: [...state.posts, newPost]
            };

        case SET_USER_PROFILE:
            return {
                ...state, profile: action.payload!.profile
            }

        case SET_STATUS:
            return {
                ...state, status: action.payload!.status
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
                ...state, profileUpdateStatus: action.payload!.status
            }

        default:
            return state;
    }
}

type addPostACActionType = {
    type: typeof ADD_POST
    payload: {
        newPostText: string
    }
}
export const addPostAC = (newPostText: string): addPostACActionType => ({type: ADD_POST, payload: {newPostText}})
type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: {
        profile: ProfileType
    }
}
const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type: SET_USER_PROFILE, payload: {profile}})
type setProfileUpdateStatusActionType = {
    type: typeof SET_PROFILE_UPDATE_STATUS
    payload: {
        status: string
    }
}
const setProfileUpdateStatus = (status: string): setProfileUpdateStatusActionType => ({type: SET_PROFILE_UPDATE_STATUS, payload: {status}})
type setStatusActionType = {
    type: typeof SET_STATUS
    payload: {
        status: string
    }
}
const setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, payload: {status}})
export const deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, payload: {postId}})
type deletePostActionType = {
    type: typeof DELETE_POST
    payload: {
        postId: number
    }
}
type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    payload: {
        photos: PhotosType
    }
}
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, payload: {photos,...photos}})
export const getStatus = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getStatus(userId)
            .then(json => {
                dispatch(setStatus(json))
            })
    }
}
export const updateStatus = (status: string) => {
    return (dispatch: any) => {
        profileAPI.updateStatus(status)
            .then(json => {
                if (json.resultCode === 0) {
                    dispatch(setStatus(status) )
                }
            })
            .catch((err) => {
                console.error(err);
        })
    }
}
export const getUserProfile = (userId: number) => {
    return (dispatch: any) => {

         usersAPI.getProfile(userId)
             .then(json => {dispatch(setUserProfile(json))
        })
    }
}
export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
         let json =  await usersAPI.savePhoto(file);

         if (json.resultCode === 0) {
             dispatch(savePhotoSuccess(json.data));
         }
    }
}
export const saveProfile = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => {
        let json =  await profileAPI.saveProfile(profile);

        if (json.resultCode === 0) {
            dispatch(setProfileUpdateStatus('success'));
            dispatch(setUserProfile(profile));
            dispatch(setProfileUpdateStatus('none'));
        }
            else {
                setProfileUpdateStatus('error');
                const res = json.messages[0].toLowerCase();
                const err = res.substring(res.length - 1 , res.indexOf('>') + 1);

                dispatch(stopSubmit('profile-info',{'contacts': {
                        [err]: json.messages[0]
                    }}))

                return Promise.reject(json.messages[0]);
        }
    }
}

export default profileReducer

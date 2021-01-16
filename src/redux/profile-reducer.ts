import {profileAPI, usersAPI } from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST =  'ADD_POST';
const SET_USER_PROFILE =  'SET_USER_PROFILE';
const SET_STATUS =  'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const FAKE_USERS =  'FAKE_USERS';
const SAVE_PHOTO_SUCCESS =  'SAVE_PHOTO_SUCCESS';
const SET_PROFILE_UPDATE_STATUS =  'SET_PROFILE_UPDATE_STATUS';


let initialState = {
    posts: [
        {id: 1, message: 'Hello',likesCount: 1},
        {id: 2, message: 'Hi',likesCount: 1},
    ],
    profile: null as unknown,
    status: '',
    profileUpdateStatus: 'none',
};

const profileReducer = (state = initialState, action: { type: string, payload?: { newText: string, profile: any, status: string, newPostText: any, postId: number, photos: any} }) => {

    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: Date.now(), message: action.payload!.newPostText, likesCount: 1
            }
             return {
                ...state, newPostText: '', posts: [...state.posts, newPost]
            };

        case SET_USER_PROFILE:
            return {
                ...state, profile: action.payload!.profile
            }

        case SET_STATUS:
            return {
                ...state, status: action.payload!.status
            }
        case FAKE_USERS:
        return {
            ...state, posts: []
        }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter((post) => post.id !== action.payload!.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile as {} , photos: action.payload!.photos.photos}
            }
        case SET_PROFILE_UPDATE_STATUS:
            return {
                ...state, profileUpdateStatus: action.payload!.status
            }

        default:
            return state;
    }
}

export const addPostAC = (newPostText: any) => ({type: ADD_POST, payload: {newPostText}});
const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, payload: { profile }});
const setProfileUpdateStatus = (status: any) => ({type: SET_PROFILE_UPDATE_STATUS, payload: {status}});
const setStatus = (status: string) => ({type: SET_STATUS, payload: { status }});
export const deletePost = (postId: number) => ({type: DELETE_POST, payload: {postId}})
export const savePhotoSuccess = (photos: any) => ({type: SAVE_PHOTO_SUCCESS, payload: {photos}})
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

export const saveProfile = (profile: any) => {
    return async (dispatch: any, getState: any) => {
        let json =  await profileAPI.saveProfile(profile);

        if (json.resultCode === 0) {
            dispatch(setProfileUpdateStatus('success'));
            dispatch(setUserProfile(profile));
            dispatch(setProfileUpdateStatus('none'));
        }

        // TODO сделано
        // 47:00 это же безумие делать лишний запрос к серверу!!! Если мы только
        // что отправили данные на сервер и он ответил, что они приняты -
        // нельзя ли взять эти же данные (которые мы отправляли) и их задиспатчить с
        // стейт сразу? Потому что, КАКИЕ еще данные нам может вернуть сервер, кроме тех,
        // которые мы сами же ему только что отправили.

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
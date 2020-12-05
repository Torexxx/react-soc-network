import {profileAPI, usersAPI } from "../api/api";

const ADD_POST =  'ADD_POST';
const SET_USER_PROFILE =  'SET_USER_PROFILE';
const SET_STATUS =  'SET_STATUS';


let initialState = {
    posts: [
        {id: 1, message: 'Hello',likesCount: 1},
        {id: 2, message: 'Hi',likesCount: 1},
    ],
    // newPostText: '',
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action: { type: string, payload?: { newText: string, profile: any, status: string, newPostText: any} }) => {

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

        default:
            return state;
    }
}

export const addPostAC = (newPostText: any) => ({type: ADD_POST, payload: {newPostText}});
const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, payload: { profile }});
const setStatus = (status: string) => ({type: SET_STATUS, payload: { status }});

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

export default profileReducer
import {IUser} from "../interfaces";
import {usersAPI} from "../api/api";
const FOLLOW =  'FOLLOW';
const UNFOLLOW =  'UNFOLLOW';
const SET_USERS =  'SET_USERS';
const SET_CURRENT_PAGE =  'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT =  'SET_TOTAL_USERS_COUNT';
const SHOW_LOADER =  'SHOW_LOADER';
const HIDE_LOADER =  'HIDE_LOADER';
const TOGGLE_IS_FOLLOWING_PROGRESS =  'TOGGLE_IS_FOLLOWING_PROGRESS';

const FAKE =  'FAKE';


let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

};

const usersReducer = (state = initialState, action: { type: string, payload?: { userId?: number, page: number, usersCount: number, users: Array<IUser>, isFetching?: boolean} }) => {

    switch (action.type) {
        case FOLLOW :
            return {...state,
                users: state.users.map( (user: IUser) => {
                    if (user.id === action.payload!.userId) {
                        return { ...user, followed: true }
                    } else {
                        return user
                    }
                })
            }
        case UNFOLLOW :
            return {...state,
                users: state.users.map( (user: IUser) => {
                    if (user.id === action.payload!.userId) {
                        return { ...user, followed: false }
                    } else {
                        return user
                    }
                })
            }

        case SET_USERS:
            return {...state, users: [ ...action.payload!.users]}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload!.page }

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.payload!.usersCount }

        case SHOW_LOADER:
            return {...state, isFetching: true }

        case HIDE_LOADER:
            return {...state, isFetching: false }

        case TOGGLE_IS_FOLLOWING_PROGRESS:

            return {
                ...state,
                followingInProgress: action.payload!.isFetching
                    ? [...state.followingInProgress,  action.payload!.userId ]
                    :  state.followingInProgress.filter((id: number) => id !== action.payload!.userId)
            }

        case FAKE:
            return {
                ...state,
            }



        default:
            return state;
    }
}

export const followSuccess = (userId: number) => ({type: FOLLOW, payload: {userId}});
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, payload: {userId}});
export const setUsers = (users: IUser[]) => ({type: SET_USERS, payload: {users}});
export const setCurrentPage = (page: number) => ({type: SET_CURRENT_PAGE, payload: {page}});
export const setTotalUsersCount = (usersCount: number) => ({type: SET_TOTAL_USERS_COUNT, payload: {usersCount}});
export const showLoader = () => ({type: SHOW_LOADER});
export const hideLoader = () => ({type: HIDE_LOADER});
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, payload: {isFetching, userId}});


export const getRequestUsers = (pageSize: number, page: number) => {
    return (dispatch: any) => {
        dispatch(showLoader());
        dispatch(setCurrentPage(page));
        usersAPI.getUsers(pageSize, page)
            .then(json => {
                dispatch(setUsers(json.items))
                dispatch(setTotalUsersCount(json.totalCount))
                dispatch(hideLoader());
            })
            .catch((error) => console.log(error + ' -- включи инет'))
    }
}

export const follow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingInProgress(true, userId));
        usersAPI.follow(userId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(followSuccess(userId));
                }
                dispatch(toggleFollowingInProgress(false, userId));
            })
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingInProgress(true, userId));
        usersAPI.unfollow(userId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(toggleFollowingInProgress(false, userId));
            })
    }
}

export default usersReducer;

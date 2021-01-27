import {usersAPI} from "../api/api";
import {IUser} from "../types/types";
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<IUser>,
    pageSize: 24,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number | undefined>, // array of users id
    portionSize: 5
};

export type InitialStateType = typeof initialState

type ActionType = {
 type: string
    payload?: {
        userId?: number
        page: number
        usersCount: number
        users: Array<IUser>
        isFetching?: boolean
 }
}

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {

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
                    :  state.followingInProgress.filter((id: number | undefined) => id !== action.payload!.userId)
            }

        default:
            return state;
    }
}

type followSuccessActionType = {
    type: typeof FOLLOW
    payload: {
        userId: number
    }
}
export const followSuccess = (userId: number): followSuccessActionType => ({type: FOLLOW, payload: {userId}});
type unfollowSuccessActionType = {
    type: typeof UNFOLLOW
    payload: {
        userId: number
    }
}
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => ({type: UNFOLLOW, payload: {userId}});
type setUsersActionType = {
    type: typeof SET_USERS
    payload: {
        users: Array<IUser>
    }
}
export const setUsers = (users: Array<IUser>): setUsersActionType => ({type: SET_USERS, payload: {users}});
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    payload: {
        page: number
    }
}
export const setCurrentPage = (page: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, payload: {page}});
type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    payload: {
        usersCount: number
    }
}
export const setTotalUsersCount = (usersCount: number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, payload: {usersCount}});
type showLoaderActionType = {
    type: typeof SHOW_LOADER
}
export const showLoader = (): showLoaderActionType => ({type: SHOW_LOADER});
type hideLoaderActionType = {
    type: typeof HIDE_LOADER
}
export const hideLoader = (): hideLoaderActionType => ({type: HIDE_LOADER});
type toggleFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    payload: {
        isFetching: boolean
        userId: number
    }
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): toggleFollowingInProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, payload: {isFetching, userId}});

export const getRequestUsers = (page: number, pageSize: number) => {

    return (dispatch: any) => {

        dispatch(showLoader());
        dispatch(setCurrentPage(page));

        usersAPI.getUsers(pageSize, page)
            .then(json => {
                dispatch(setUsers(json.items))
                dispatch(setTotalUsersCount(json.totalCount))
                dispatch(hideLoader());
            })
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

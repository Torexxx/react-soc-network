import {Dispatch} from "redux";
import {ResultCodesEnum, usersAPI} from "../api/api";
import {IUser} from "../types/types";
import {updateObjectInArray} from "../utils/object-helpers"
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

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
    followingInProgress: [] as Array<number>, // array of users id
    portionSize: 5
};

export type InitialStateType = typeof initialState;

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType
    | SetTotalUsersCountActionType | showLoaderActionType | HideLoaderActionType | ToggleFollowingInProgressActionType;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case FOLLOW :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: true})
            }
        case UNFOLLOW :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: false})
                // users: state.users.map( (user: IUser) => {
                //     if (user.id === action.payload.userId) {
                //         return { ...user, followed: false }
                //     } else {
                //         return user
                //     }
                // })
            }

        case SET_USERS:
            return {...state, users: [...action.payload.users]}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload.page}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.payload.usersCount}

        case SHOW_LOADER:
            return {...state, isFetching: true}

        case HIDE_LOADER:
            return {...state, isFetching: false}

        case TOGGLE_IS_FOLLOWING_PROGRESS:

            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter((id: number) => id !== action.payload.userId)
            }

        default:
            return state;
    }
};

type FollowSuccessActionType = {
    type: typeof FOLLOW
    payload: {
        userId: number
    }
};
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, payload: {userId}});
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    payload: {
        userId: number
    }
};
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, payload: {userId}});
type SetUsersActionType = {
    type: typeof SET_USERS
    payload: {
        users: Array<IUser>
    }
};
export const setUsers = (users: Array<IUser>): SetUsersActionType => ({type: SET_USERS, payload: {users}});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    payload: {
        page: number
    }
};
export const setCurrentPage = (page: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    payload: {page}
});
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    payload: {
        usersCount: number
    }
};
export const setTotalUsersCount = (usersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    payload: {usersCount}
});
type showLoaderActionType = {
    type: typeof SHOW_LOADER
};
export const showLoader = (): showLoaderActionType => ({type: SHOW_LOADER});
type HideLoaderActionType = {
    type: typeof HIDE_LOADER
};
export const hideLoader = (): HideLoaderActionType => ({type: HIDE_LOADER});
type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    payload: {
        isFetching: boolean
        userId: number
    }
};
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    payload: {isFetching, userId}
});

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
// ===========================================
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getRequestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {

        dispatch(showLoader());
        dispatch(setCurrentPage(page));

        usersAPI.getUsers(pageSize, page)
            .then(data => {
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
                dispatch(hideLoader());
            })
    }
};

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
};
export const unfollow = (userId: number) => {
    return async (dispatch: DispatchType, getState: GetStateType) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
};

export default usersReducer;

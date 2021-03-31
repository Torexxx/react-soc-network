import {Dispatch} from "redux";
import {ResultCodesEnum} from "../api/api";
import {IUser} from "../types/types";
import {updateObjectInArray} from "../utils/object-helpers"
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<IUser>,
    pageSize: 24,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users id
    portionSize: 5,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case "SN/USERS/FOLLOW" :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: true})
            }
        case "SN/USERS/UNFOLLOW" :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: false})
            }

        case "SN/USERS/SET_USERS":
            return {...state, users: [...action.payload.users]}

        case "SN/USERS/SET_FILTER":
            return {...state, filter: action.payload}

        case "SN/USERS/SET_CURRENT_PAGE":
            return {...state, currentPage: action.payload.page}

        case "SN/USERS/SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.payload.usersCount}

        case "SN/USERS/SHOW_LOADER":
            return {...state, isFetching: true}

        case "SN/USERS/HIDE_LOADER":
            return {...state, isFetching: false}

        case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS":

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

export const actions = {
    followSuccess: (userId: number) => ({type: "SN/USERS/FOLLOW", payload: {userId}} as const),
    unfollowSuccess: (userId: number) => ({type: "SN/USERS/UNFOLLOW", payload: {userId}} as const),
    setUsers: (users: Array<IUser>) => ({type: "SN/USERS/SET_USERS", payload: {users}} as const),
    setCurrentPage: (page: number) => ({type: "SN/USERS/SET_CURRENT_PAGE", payload: {page}} as const),
    setTotalUsersCount: (usersCount: number) => ({type: "SN/USERS/SET_TOTAL_USERS_COUNT", payload: {usersCount}} as const),
    showLoader: () => ({type: "SN/USERS/SHOW_LOADER"} as const),
    hideLoader: () => ({type: "SN/USERS/HIDE_LOADER"} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS", payload: {isFetching, userId}} as const),
    setFilter: (filter: FilterType) => ({type: "SN/USERS/SET_FILTER", payload: filter} as const)
};

export const getRequestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {

        dispatch(actions.showLoader());
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));

        usersAPI.getUsers(pageSize, page, filter.term, filter.friend)

            .then(data => {
                console.log(1)
                dispatch(actions.setUsers(data.items));
                dispatch(actions.setTotalUsersCount(data.totalCount));
                dispatch(actions.hideLoader());
            })
    }
};
const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {

        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
};
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch, getState: GetStateType) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
};

export default usersReducer;

type GetStateType = () => AppStateType;
type ThunkType = BaseThunkType<ActionTypes>;
export type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
export type FilterType = typeof initialState.filter;
import {Dispatch} from "redux";
import {ResultCodesEnum} from "../api/api";
import {IUser} from "../types/types";
import {updateObjectInArray} from "../utils/object-helpers"
import {AppStateType, InferActionTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api";

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

// type ActionTypes = ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess>
//                  | ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount>
//                  | ReturnType<typeof showLoader> | ReturnType<typeof hideLoader>  | ReturnType<typeof toggleFollowingInProgress>

function inferLiteralFromString<T extends string>(arg: T): T {
    return arg;
}
// function inferLiteral<U, T extends U>(arg: T) : T {
//     return arg
// }
//
// function inferStringLiteral<T extends string>(arg: T): T {
//     return inferLiteral<string, T>(arg);
// }

// const a = inferLiteralFromString<string>('some string')
// console.log('a', a)
// const b = inferLiteralFromString<'some string'>('some string')
// console.log('b', b)

// Джинерик Тип требует аргументы, функуия джинерик -неет
type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    followSuccess : (userId: number) => ({type: "FOLLOW", payload: {userId}} as const),
    unfollowSuccess : (userId: number) => ({type: "UNFOLLOW", payload: {userId}} as const),
    setUsers : (users: Array<IUser>) => ({type: "SET_USERS", payload: {users}} as const),
    setCurrentPage : (page: number) => ({type: "SET_CURRENT_PAGE", payload: {page}} as const),
    setTotalUsersCount : (usersCount: number) => ({type: "SET_TOTAL_USERS_COUNT", payload: {usersCount}} as const),
    showLoader : () => ({type: "SHOW_LOADER"} as const),
    hideLoader : () => ({type: "HIDE_LOADER"} as const),
    toggleFollowingInProgress : (isFetching: boolean, userId: number) => ({type: "TOGGLE_IS_FOLLOWING_PROGRESS", payload: {isFetching, userId}} as const),
}

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case "FOLLOW" :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: true})
            }
        case "UNFOLLOW" :
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: false})
            }

        case "SET_USERS":
            return {...state, users: [...action.payload.users]}

        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.payload.page}

        case "SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.payload.usersCount}

        case "SHOW_LOADER":
            return {...state, isFetching: true}

        case "HIDE_LOADER":
            return {...state, isFetching: false}

        case "TOGGLE_IS_FOLLOWING_PROGRESS":

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


type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionTypes>;
// ===========================================
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getRequestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {

        dispatch(actions.showLoader());
        dispatch(actions.setCurrentPage(page));

        usersAPI.getUsers(pageSize, page)
            .then(data => {
                dispatch(actions.setUsers(data.items))
                dispatch(actions.setTotalUsersCount(data.totalCount))
                dispatch(actions.hideLoader());
            })
    }
};

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
};
export const unfollow = (userId: number) => {
    return async (dispatch: DispatchType, getState: GetStateType) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
};

export default usersReducer;

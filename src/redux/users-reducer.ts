import {IUser} from "../interfaces";
const FOLLOWTOGGLE =  'FOLLOWTOGGLE';
const SET_USERS =  'SET_USERS';
const SET_CURRENT_PAGE =  'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT =  'SET_TOTAL_USERS_COUNT';
const SHOW_LOADER =  'SHOW_LOADER';
const HIDE_LOADER =  'HIDE_LOADER';


let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
};

const usersReducer = (state = initialState, action: { type: string, payload?: { userId?: number, page: number, usersCount: number, users: Array<IUser>} }) => {
    switch (action.type) {
        case FOLLOWTOGGLE :
            return {...state,
                users: state.users.map( (user: IUser) => {
                    if (user.id === action.payload!.userId) {
                        return { ...user, followed: !user.followed }
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
        default:
            return state;
    }
}

export const followToggle = (userId: number) => ({type: FOLLOWTOGGLE, payload: {userId}});
export const setUsers = (users: IUser[]) => ({type: SET_USERS, payload: {users}});
export const setCurrentPage = (page: number) => ({type: SET_CURRENT_PAGE, payload: {page}});
export const setTotalUsersCount = (usersCount: number) => ({type: SET_TOTAL_USERS_COUNT, payload: {usersCount}});
export const showLoader = () => ({type: SHOW_LOADER});
export const hideLoader = () => ({type: HIDE_LOADER});

export default usersReducer;

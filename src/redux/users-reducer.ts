import {IUser} from "../interfaces";
const FOLLOWTOGGLE =  'FOLLOWTOGGLE';
const SET_USERS =  'SET_USERS';
const SET_CURRENT_PAGE =  'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT =  'SET_TOTAL_USERS_COUNT';


let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1
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

        default:
            return state;
    }
}

export const followToggleAC = (userId: number) => ({type: FOLLOWTOGGLE, payload: {userId}});
export const setUsersAC = (users: IUser[]) => ({type: SET_USERS, payload: {users}});
export const setCurrentPageAC = (page: number) => ({type: SET_CURRENT_PAGE, payload: {page}});
export const setTotalUsersCountAC = (usersCount: number) => ({type: SET_TOTAL_USERS_COUNT, payload: {usersCount}});

export default usersReducer;

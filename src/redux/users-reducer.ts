import {IUser} from "../interfaces";
const FOLLOWTOGGLE =  'FOLLOWTOGGLE';
const SET_USERS =  'SET_USERS';

let initialState = {
    users: [],
};

const usersReducer = (state = initialState, action: { type: string, payload?: { userId?: number, users: Array<IUser>} }) => {

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
            return {...state, users: [...state.users, ...action.payload!.users]}

        default:
            return state;
    }
}

export const followToggleAC = (userId: number) => ({type: FOLLOWTOGGLE, payload: {userId}});
export const setUsersAC = (users: IUser[]) => ({type: SET_USERS, payload: {users}});

export default usersReducer;

import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS =  'INITIALIZED_SUCCESS';

type ActionsTypes = InitializeSuccessActionType;

export type InitialStateType = {
    initialized: boolean
    globalError: any
};

let initialState: InitialStateType = {
    initialized: false,
    globalError: null
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
        }
        default:
            return state
    }
}
type InitializeSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
const initializedSuccess = (): InitializeSuccessActionType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    await Promise.all([promise]);
    dispatch(initializedSuccess());
    }

export default appReducer

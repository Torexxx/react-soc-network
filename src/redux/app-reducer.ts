import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS =  'INITIALIZED_SUCCESS';

type actionType = {
    type: string;
}

export type InitialStateType = {
    initialized: boolean
    globalError: any
};

let initialState: InitialStateType = {
    initialized: false,
    globalError: null
};

// export type InitialStateType = typeof initialState;

type InitializeSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

const appReducer = (state = initialState, action: actionType): InitialStateType => {
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

const initializedSuccess = (): InitializeSuccessActionType => ({ type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
         let promise = dispatch(getAuthUserData())

         Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
    }

export default appReducer
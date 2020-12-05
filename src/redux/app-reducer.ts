import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS =  'INITIALIZED_SUCCESS';

let initialState = {
   initialized: false
};

const appReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
        }

        default:
            return state
    }
}

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
    return (dispatch: any) => {
         let promise = dispatch(getAuthUserData())

         Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
    }
}



export default appReducer
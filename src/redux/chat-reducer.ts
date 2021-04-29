import {ResultCodesEnum} from "../api/api";
import {reset, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import { BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";
import {FormAction} from "redux-form/lib/actions";
import {ChatMessage} from "../api/chat-api";

let initialState = {
    messages: [] as ChatMessage[]
};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEVIED':

            return {
                ...state,
                messages: [...state.messages,  action.payload.message]

            };


        default:
            return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessage[]) => ({type:"SN/CHAT/MESSAGES_RECEVIED", payload: {messages}} as const),

};

// export const sendMessage = (messages: ChatMessage ): ThunkType => async (dispatch) => {
//     dispatch(actions.messagesReceived(messages))
// }




export default chatReducer;

type Nullable<T> = T | null;
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

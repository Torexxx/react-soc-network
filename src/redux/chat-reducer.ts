import {ResultCodesEnum} from "../api/api";
import {reset, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import { BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";
import {FormAction} from "redux-form/lib/actions";
import {chatAPI, ChatMessage} from "../api/chat-api";
import { Dispatch } from "redux";

let initialState = {
    messages: [] as ChatMessage[]
};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED':

            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]

            };

        default:
            return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessage[]) => ({type:"SN/chat/MESSAGES_RECEIVED", payload: {messages}} as const),
};

let _newMessageHandler: ((messages: ChatMessage[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        }
    }

    return _newMessageHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch));

};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop();
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
};




export default chatReducer;

type Nullable<T> = T | null;
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

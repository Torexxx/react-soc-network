const ADD_MESSAGE_TEXT =  'ADD_MESSAGE_TEXT';

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Torex'},
        {id: 2, name: 'Jetkokos'},
        {id: 3, name: 'Dustman'},
        {id: 4, name: 'Lue kang'},
        {id: 5, name: 'Big Boss'},
    ] as Array<DialogType>,

    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'Blalla'},
        {id: 4, message: 'Do yo like it'},
        {id: 5, message: 'Ok!'},
    ] as Array<MessageType>,
};

export type initialStateType = typeof initialState;

type ActionType = {
    type: string
    payload?: {
        dialogText: string,
        newMessageBody: any
    }
}

const dialogsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE_TEXT :
           let body = action.payload!.newMessageBody;
            return {
                ...state,
                    messages: [...state.messages, {id: Date.now(), message: body} ]};

        default:
            return state;
    }
}

type addMessageTextACActionPayloadType = {
    newMessageBody: string
}
type addMessageTextACActionType = {
    type: typeof ADD_MESSAGE_TEXT
    payload: addMessageTextACActionPayloadType
}
export const addMessageTextAC = (newMessageBody: string): addMessageTextACActionType => (
        {type: ADD_MESSAGE_TEXT, payload: {newMessageBody}}
    );

export default dialogsReducer;

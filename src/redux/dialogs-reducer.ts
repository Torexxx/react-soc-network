const ADD_MESSAGE_TEXT =  'ADD_MESSAGE_TEXT';
const UPDATE_NEW_MESSAGE_TEXT =  'UPDATE_NEW_MESSAGE_TEXT';

let initialState = {
    dialogs: [
        {id: 1, name: 'Torex'},
        {id: 2, name: 'Jetkokos'},
        {id: 3, name: 'Dustman'},
        {id: 4, name: 'Lue kang'},
        {id: 5, name: 'Big Boss'},

    ],
    messages:  [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'Blalla'},
        {id: 4, message: 'Do yo like it'},
        {id: 5, message: 'Ok!'},
    ],
    newMessageText: '',
};

const dialogsReducer = (state = initialState, action: { type: string, payload?: { dialogText: string} }) => {
    switch (action.type) {
        case ADD_MESSAGE_TEXT :
           let body = state.newMessageText;
            return {...state, newMessageText: '',
                    messages: [...state.messages, {id: Date.now(), message: body} ]};

        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.payload!.dialogText };

        default:
            return state;
    }
}

export const addMessageTextAC = () => ({type: ADD_MESSAGE_TEXT});
export const updateMessageTextAC = (text: string) => ({type: UPDATE_NEW_MESSAGE_TEXT, payload: { dialogText: text }});

export default dialogsReducer;
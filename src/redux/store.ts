 import profileReducer from "./profile-reducer";
 import dialogsReducer from "./dialogs-reducer";

// export let store2 = {
//
//     _callSubscriber(state: any) {
//         console.log('state changed')
//     },
//     _state: {
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: 'Torex'},
//                 {id: 2, name: 'Jetkokos'},
//                 {id: 3, name: 'Dustman'},
//                 {id: 4, name: 'Lue kang'},
//                 {id: 5, name: 'Big Boss'},
//
//             ],
//             messages:  [
//                 {id: 1, message: 'Hello'},
//                 {id: 2, message: 'Hi'},
//                 {id: 3, message: 'Blalla'},
//                 {id: 4, message: 'Do yo like it'},
//                 {id: 5, message: 'Ok!'},
//             ],
//             newMessageText: '',
//         },
//         profilePage: {
//             posts: [
//                 {id: 1, message: 'Hello',likesCount: 1},
//                 {id: 2, message: 'Hi',likesCount: 1},
//             ],
//             newPostText: '',
//         },
//     },
//
//      getState() {
//         return this._state
//     },
//
//     dispatch(action: { type: string, payload?: { newText: string, dialogText: string} }) {
//         store2._state.profilePage = profileReducer(this._state.profilePage, action);
//         store2._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//
//         this._callSubscriber(store2._state);
//     },
//
//     subscribe (observer: any) {  // :/
//             this._callSubscriber = observer;
//     }
// };

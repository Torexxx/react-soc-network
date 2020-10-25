import {addMessageTextAC, updateMessageTextAC} from '../../redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {IState} from "../../interfaces";
import {connect} from "react-redux";

// type DialogsProps = {
//     store: Store<CombinedState<IState>>
// }

// const DialogsContainer: React.FunctionComponent = () => {
//
//     return <StoreContext.Consumer>
//         {
//             (store) => {
//                 let state = store.getState().dialogsPage;
//
//                 const onSendMessageClick = () => {
//                     store.dispatch(addMessageTextAC());
//                 }
//
//                 const onNewMessageChange = (body: string) => {
//                     store.dispatch(updateMessageTextAC(body))
//                 }
//                 return <Dialogs sendNewMessage ={ onSendMessageClick } updateNewMessageBody ={ onNewMessageChange } dialogsPage ={ state }/>
//             }
//         }
//
//             </StoreContext.Consumer>
//
//
// }

let mapStateToProps = (state: IState) => {
    return {
        dialogsPage: state.dialogsPage
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        sendNewMessage: () => {
            dispatch(addMessageTextAC());
        },
        updateNewMessageBody: (body: string) => {
            dispatch(updateMessageTextAC(body))
        }
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;

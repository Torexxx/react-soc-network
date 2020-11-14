import {addMessageTextAC, updateMessageTextAC} from '../../redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {IState} from "../../interfaces";
import {connect} from "react-redux";

// type DialogsProps = {
//     store2: Store<CombinedState<IState>>
// }

// const DialogsContainer: React.FunctionComponent = () => {
//
//     return <StoreContext.Consumer>
//         {
//             (store2) => {
//                 let state = store2.getState().dialogsPage;
//
//                 const onSendMessageClick = () => {
//                     store2.dispatch(addMessageTextAC());
//                 }
//
//                 const onNewMessageChange = (body: string) => {
//                     store2.dispatch(updateMessageTextAC(body))
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

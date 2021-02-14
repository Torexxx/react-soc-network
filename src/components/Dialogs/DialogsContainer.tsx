import {ActionsTypes, actions, DialogType, MessageType} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import { AppStateType } from "../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    dialogsPage: {
        dialogs: Array<DialogType>
        messages: Array<MessageType>
    }
};
type MapDispatchPropsType = {
    sendNewMessage: (newMessageBody: string) => void
};
type DispatchType = Dispatch<ActionsTypes>;

let mapStateToProps = (state: AppStateType) : MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch: DispatchType): MapDispatchPropsType => {
    return {
        sendNewMessage: (newMessageBody: string) => {
            dispatch(actions.addMessageTextAC(newMessageBody));
        },
    }
};

const DialogsContainer = connect(
    mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs)
);

export default DialogsContainer;

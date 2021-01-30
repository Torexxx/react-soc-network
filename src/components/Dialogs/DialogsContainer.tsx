import {addMessageTextAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import { AppStateType } from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        sendNewMessage: (newMessageBody: string) => {
            dispatch(addMessageTextAC(newMessageBody));
        }
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs));

export default DialogsContainer;

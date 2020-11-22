import {addMessageTextAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {IState} from "../../interfaces";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

let mapStateToProps = (state: IState) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        sendNewMessage: (newMessageBody: any) => {
            dispatch(addMessageTextAC(newMessageBody));
        }
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs));

export default DialogsContainer;

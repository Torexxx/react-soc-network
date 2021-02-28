import React from 'react';
import {actions, DialogType, MessageType} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/redux-store";
import { compose } from "redux";

type MapStatePropsType = {
    dialogsPage: {
        dialogs: Array<DialogType>
        messages: Array<MessageType>
    }
};
type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
};
// type DispatchType = Dispatch<ActionsTypes>;

let mapStateToProps = (state: AppStateType) : MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

// let mapDispatchToProps = (dispatch: DispatchType): MapDispatchPropsType => {
//     return {
//         sendNewMessage: (newMessageBody: string) => {
//             dispatch(actions.addMessageText(newMessageBody));
//         },
//     }
// };

// const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(
//     mapStateToProps, {sendMessage: actions.sendMessage})(withAuthRedirect(Dialogs)
// );

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs);



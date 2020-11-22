import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {IDialog, IMessage} from "../../interfaces";
import { reduxForm, Field } from 'redux-form';

type DialogsProps = {
    dialogsPage: {
        dialogs: Array<IDialog>
        messages: Array<IMessage>
        newMessageText: string
    }
    sendNewMessage(body: any): void
    isAuth: boolean,
}

const AddMessageForm = ({ handleSubmit}: any) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field  component="textarea" name={'newMessageBody'} placeholder='Enter text'/>
            <button>Send</button>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

const Dialogs: React.FunctionComponent<DialogsProps> = ({sendNewMessage, dialogsPage, isAuth}) => {

     let state = dialogsPage;
     let messageElements = state.messages.map( (m:{id: number, message: string}) => <Message key={m.id} {...m} /> );
     let dialogsElements = state.dialogs.map( ({id, name}:any) => <DialogItem key={id} name = {name} id={id} /> );

    const addNewMessage = (values: any) => {
        let body = values.newMessageBody;
        sendNewMessage(body);
    }

    return (
        <div className={s.dialogs}>
           <div className={s.dialogsItems}>
               { dialogsElements }
              <AddMessageReduxForm onSubmit={addNewMessage} />
            </div>
            <div className={s.messages }>
                { messageElements }
            </div>
        </div>
    );
}

export default Dialogs;


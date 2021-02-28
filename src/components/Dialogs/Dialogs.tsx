import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { initialStateType } from '../../redux/dialogs-reducer';

type Props = {
    dialogsPage: initialStateType
    sendMessage(messageText: string): void
}
export type MessageFormValues = {
    newMessageBody: string
};

const Dialogs: React.FC<Props> = ({sendMessage, dialogsPage}) => {
     let state = dialogsPage;
     let messageElements = state.messages.map( (m:{id: number, message: string}) => <Message key={m.id} {...m} /> );
     let dialogsElements = state.dialogs.map( ({id, name}:any) => <DialogItem key={id} name = {name} id={id} /> );

    const addNewMessage = (values: MessageFormValues) => {
        sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
           <div className={s.dialogsItems}>
               { dialogsElements }
              <AddMessageForm onSubmit={addNewMessage} />
            </div>
            <div className={s.messages }>
                { messageElements }
            </div>
        </div>
    );
}

export default Dialogs;

import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {IDialog, IMessage} from "../../interfaces";

type DialogsProps = {
    dialogsPage: {
        dialogs: Array<IDialog>
        messages: Array<IMessage>
        newMessageText: string
    }
    //
    // dispatch(action: { type: string, payload?:{ dialogText: string } }): void
    updateNewMessageBody(text: string): void
    sendNewMessage(): void
}

const Dialogs: React.FunctionComponent<DialogsProps> = ({sendNewMessage, updateNewMessageBody, dialogsPage}) => {

    let state = dialogsPage;

// const Dialogs = ({dialogs, messages}: DialogsProps) => {
     let messageElements = state.messages.map( (m:{id: number, message: string}) => <Message key={m.id} {...m} /> );

     let dialogsElements = state.dialogs.map( ({id, name}:any) => <DialogItem key={id} name = {name} id={id} /> );

    const onSendMessageClick = () => {
        sendNewMessage();
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        updateNewMessageBody(body);
    }

    return (
        <div className={s.dialogs}>
           <div className={s.dialogsItems}>

               { dialogsElements }
               <textarea value={ state.newMessageText } onChange={onNewMessageChange}/>
               <button onClick={ onSendMessageClick }>Send</button>
            </div>
            <div className={s.messages }>

                { messageElements }

            </div>
        </div>
    );
}

export default Dialogs;

import React, {useEffect, useState} from 'react';
import { ChatMessage } from '../../api/chat-api';
import {useDispatch, useSelector} from "react-redux";
import {startMessagesListening, stopMessagesListening, sendMessage} from "../../redux/chat-reducer";
import { AppStateType } from '../../redux/redux-store';

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());

        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
};

const Messages: React.FC<{}> = () => {

const messages = useSelector((state: AppStateType) => state.chat.messages);

    return <div style={{height: 250, overflowY: "auto"}}>
        {messages.map((message, index) => <Message key={index} message = {message}/>)}
    </div>
}

const Message: React.FC<{message: ChatMessage}> = ({message}) => {

    return <div>
       <img style={{width: '30px'}} alt={'avatar'} src={message.photo}/> <b>{message.userName}</b>
        <br/>

        { message.message}
        <hr/>
    </div>
}

const AddMessageForm: React.FC<{}> = () => {

    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) return;
        dispatch(sendMessage(message));
        setMessage('');
    }


    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button onClick={sendMessageHandler} disabled={false} >Отправить</button>
        </div>
    </div>
}

export default ChatPage;

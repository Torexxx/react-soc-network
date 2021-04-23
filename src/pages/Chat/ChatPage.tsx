import React, {useEffect, useState} from 'react';

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessage = {
    message: string,
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {

    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages />
            <AddMessageForm/>
        </div>
    );
};

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        wsChannel.addEventListener('message', (event: MessageEvent) => {
            let newMessages = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, ...newMessages]);
        })
    },[])

    useEffect(() => {
        ref.scrollTo(0, ref.scrollHeight);
    }, [messages])

    let ref: HTMLDivElement;
    function setRef(refNode: HTMLDivElement) {
         ref = refNode
    }

    return <div ref={setRef} style={{height: 250, overflowY: "auto"}}>
        {messages.map((message, index) => <Message key={index} message = {message}/>)}
    </div>
}

const Message: React.FC<{message: ChatMessage}> = ({message}) => {

    return <div>
       <img style={{width: '30px'}} alt={'avatar'} src={message.photo}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'open'>('pending');

    const sendMessage = () => {
        if (!message) return;
        wsChannel.send(message);
        setMessage('');
    }

    useEffect(() => {
        wsChannel.addEventListener('open', () => {
            setReadyStatus('open')
        })
    }, [] )


    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button onClick={sendMessage} disabled={readyStatus !== 'open'} >Отправить</button>
        </div>
    </div>
}

export default ChatPage;

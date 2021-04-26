import React, {useEffect, useState} from 'react';


export type ChatMessage = {
    message: string,
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            console.log('CLOSE WS');
            setTimeout(() => createChannel(),3000);
        }

        function createChannel() {
            ws?.removeEventListener('close' , closeHandler );
            ws?.close();
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler);
            setWsChannel(ws);
        }

        createChannel();

        return () => {
            ws.removeEventListener('close' , closeHandler );
            ws.close();
        }

    }, [])

    return (
        <div>
            <Messages wsChannel = {wsChannel } />
            <AddMessageForm wsChannel = {wsChannel}/>
        </div>
    );
};

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        let messageHandler = (event: MessageEvent) => {
            let newMessages = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, ...newMessages]);
        };
        wsChannel?.addEventListener('message', messageHandler);

        return () => {
            console.log('cleanUPPPPP')
            wsChannel?.removeEventListener('message', messageHandler);
        }
    },[wsChannel])

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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    const sendMessage = () => {
        if (!message) return;
        wsChannel?.send(message);
        setMessage('');
    }

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready');
        };
        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])


    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button onClick={sendMessage} disabled={wsChannel === null || readyStatus !== 'ready'} >Отправить</button>
        </div>
    </div>
}

export default ChatPage;

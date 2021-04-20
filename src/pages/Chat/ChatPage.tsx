import React from 'react';

const ChatPage: React.FC = () => {
    return <div>
        <Messages/>
        <div><textarea/></div>
        <div>
            <button>Отправить</button>
        </div>
    </div>
}

const Messages: React.FC = () => {
    let messages = [1, 2, 4 ,5,6]

    return <div style={{height: 250, overflowY: "scroll"}} >
        {messages.map(() => {
            return <Message />
        })}
        {messages.map(() => {
            return <Message />
        })}
        {messages.map(() => {
            return <Message />
        })}
    </div>
}

const Message: React.FC = () => {
    return <div>
        <p>Hello</p>
    </div>
}



export default ChatPage;
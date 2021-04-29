
let subscribers = [] as SubscriberType[];

let ws: WebSocket;

const closeHandler = () => {
    console.log('CLOSE WS');
    setTimeout(() => createChannel(),3000);
}

const messageHandler = (event: MessageEvent) => {
    let newMessages = JSON.parse(event.data);
    subscribers.forEach(m => m(newMessages));
};

function createChannel() {
    ws?.removeEventListener('close' , closeHandler );
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler);
}

export const chatAPI = {
    subscribe: function (callback: SubscriberType) {
        subscribers.push(callback)

        return (callback: SubscriberType) => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    }
}


type SubscriberType = (messages: ChatMessage[]) => void

export type ChatMessage = {
    message: string,
    photo: string
    userId: number
    userName: string
}





////////////////////////////////

// chatAPI.subscribe()
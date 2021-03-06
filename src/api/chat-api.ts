
let subscribers = [] as SubscriberType[];

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('CLOSE WS');
    setTimeout(() => createChannel(),3000);
}

const messageHandler = (event: MessageEvent) => {
    const newMessages = JSON.parse(event.data);
    subscribers.forEach(s => s(newMessages));
};

function createChannel() {
    ws?.removeEventListener('close' , closeHandler );
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers = [];
        ws?.removeEventListener('close', closeHandler);
        ws?.removeEventListener('message', messageHandler);
        ws?.close();
    },

    subscribe: function (callback: SubscriberType) {
        subscribers.push(callback);

        return () => {
            subscribers = subscribers.filter(s => s !== callback);
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
}


type SubscriberType = (messages: ChatMessage[]) => void;

export type ChatMessage = {
    message: string,
    photo: string
    userId: number
    userName: string
}





////////////////////////////////

// chatAPI.subscribe()
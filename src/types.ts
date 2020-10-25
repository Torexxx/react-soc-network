import {IDialog, IMessage, IPost} from "./interfaces";

export type StateType = {
    dialogsPage: { dialogs: Array<IDialog>, messages: Array<IMessage>, newMessageText: string }
    profilePage: { posts: Array<IPost>, newPostText: string }
}
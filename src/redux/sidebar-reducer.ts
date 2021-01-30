import { AppStateType } from "./redux-store";

export const sidebarReducer = (state: AppStateType, action: { type: string, payload?: { newText: string, dialogText: string} }) => {
    return state;
}
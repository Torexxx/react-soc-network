import {GetItemsType, instance} from "./api";
import {IUser} from "../types/types";
import {APIResponseType} from './api';




export const usersAPI = {
    getUsers(pageSize: number, currentPage: number, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType<IUser>>(`users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(res => res.data) as Promise<APIResponseType>
    },
};

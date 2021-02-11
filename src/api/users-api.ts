import {PhotosType} from "../types/types";
import {FollowUnfollowResponseType, GetUsersType, instance, profileAPI, SavePhotoType} from "./api";

export const usersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<GetUsersType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`)
    },
    follow(userId: number) {
        return instance.post<FollowUnfollowResponseType>(`follow/${userId}`)
    },
    savePhoto(photoFile: Blob) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<SavePhotoType<PhotosType>>(`profile/photo`, formData)
            .then(res => res.data)
    }
};
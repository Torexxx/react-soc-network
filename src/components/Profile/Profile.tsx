import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type Props = {
    profile: ProfileType | null
    status: string
    updateStatus(status: string): void
    isOwner: boolean
    savePhoto(file: File): void
    saveProfile(profile: ProfileType): void
    profileUpdateStatus: string
}

const Profile: React.FC<Props> = ( props) => {
    return (
        <>
            <ProfileInfo  isOwner ={props.isOwner}
                          profile = {props.profile}
                          status = {props.status}
                          updateStatus = {props.updateStatus}
                          savePhoto = {props.savePhoto}
                          saveProfile = {props.saveProfile}
                          profileUpdateStatus = {props.profileUpdateStatus}

            />
            <MyPostsContainer />
        </>
    )
}


export default Profile;

import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

interface IProfile {
    profile : any
    status: string
    updateStatus(status: string): void
    isOwner: any
    savePhoto(file: any): void
    saveProfile(profile: any): void
    profileUpdateStatus: string
}

const Profile: React.FunctionComponent<IProfile> = ( props) => {

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

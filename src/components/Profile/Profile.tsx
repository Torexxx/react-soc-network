import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

interface IProfile {
    profile : any
    // isAuth: boolean
    status: string
    updateStatus(status: string): void
}

const Profile: React.FunctionComponent<IProfile> = ( props) => {


    return (
        <>
            <ProfileInfo  profile = {props.profile} status = {props.status} updateStatus = {props.updateStatus}/>
            <MyPostsContainer/>
        </>
    )
}

export default Profile;

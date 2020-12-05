import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Test from './Test';

interface IProfile {
    profile : any
    status: string
    updateStatus(status: string): void
}

const Profile: React.FunctionComponent<IProfile> = ( props) => {
// console.log('PROFILE RENDER')
    return (
        <>
            <ProfileInfo  profile = {props.profile} status = {props.status} updateStatus = {props.updateStatus}/>
            <MyPostsContainer/>
            <Test profile = {props.profile} />
        </>
    )
}


export default Profile;

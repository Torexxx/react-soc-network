import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
// import Test from "./Test";

interface IProfile {
    profile : any
    status: string
    updateStatus(status: string): void
    isOwner: any
    savePhoto(file: any): void
    saveProfile(profile: any): void
    profileUpdateStatus: string
}
const Width = (props: any) => {

    return (
        props.children(42)
    )
}

const Component = ({render}: any) => render('React');

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
            {/*<Test test = 'test' />*/}
            {/*<Width>*/}
            {/*    {(width: any) => <div>window is {width}</div>  }*/}
            {/*</Width>*/}
            {/*<Component render = {*/}
            {/*    (text: string) => <div>{text}</div>*/}
            {/*}/>*/}
        </>
    )
}


export default Profile;

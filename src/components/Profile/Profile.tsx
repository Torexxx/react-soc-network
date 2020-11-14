import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {IUser} from "../../interfaces";


// type ProfileProps = {
//     store2: Store<CombinedState<IState>>
//     // profilePage: { posts: Array<IPost>, newPostText: string }
//     // addPost(): void
//     // updateNewPostText(newText:string): void
//     // dispatch(action: { type: string, payload?:{ newText: string } }): void
// }

interface IProfile {
    profile : any
}

const Profile: React.FunctionComponent<IProfile> = ( props) => {
    return (
        <>
            <ProfileInfo  profile = {props.profile}/>
            <MyPostsContainer/>r
        </>
    )
}

export default Profile;

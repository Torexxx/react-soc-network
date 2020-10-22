import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


// type ProfileProps = {
//     store: Store<CombinedState<IState>>
//     // profilePage: { posts: Array<IPost>, newPostText: string }
//     // addPost(): void
//     // updateNewPostText(newText:string): void
//     // dispatch(action: { type: string, payload?:{ newText: string } }): void
// }

const Profile: React.FunctionComponent = () => {
    return (
        <>
            <ProfileInfo/>
            <MyPostsContainer/>
        </>
    )
}

export default Profile;

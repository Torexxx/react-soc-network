import {addPostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {IState} from "../../../interfaces";
import {connect} from "react-redux";

let mapStateToProps = (state: IState) => {
    return {
        posts: state.profilePage.posts,
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: any) => {
            dispatch(addPostAC(newPostText));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps )(MyPosts);

export default MyPostsContainer;
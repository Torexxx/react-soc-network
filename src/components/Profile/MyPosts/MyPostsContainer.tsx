import {addPostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {reset} from "redux-form";
import { AppStateType } from "../../../redux/redux-store";
import {PostType} from "../../../types/types";

let mapStateToProps = (state: AppStateType): MapStateProps => {
    return {
        posts: state.profilePage.posts,
    }
};

type MapStateProps = {
    posts: Array<PostType>
}
type MapDispatchProps = {
    addPost: (newPostText: string) => void
    resetField: () => void
}

let mapDispatchToProps = (dispatch: any): MapDispatchProps => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText));
        },

        resetField: () => {
            dispatch(reset('postAddMessageForm'));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);


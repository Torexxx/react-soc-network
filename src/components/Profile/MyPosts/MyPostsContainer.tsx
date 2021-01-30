import {addPostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

import {connect} from "react-redux";
import {reset} from "redux-form";
import { AppStateType } from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
};

let mapDispatchToProps = (dispatch: any) => {

    return {
        addPost: (newPostText: any) => {
            dispatch(addPostAC(newPostText));
        },

        resetField: () => {
            dispatch(reset('postAddMessageForm'));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);


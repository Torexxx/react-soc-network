import {actions, resetField} from "../../../redux/profile-reducer";
import MyPosts, {DispatchProps, MapProps } from "./MyPosts";
import {connect} from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
};

export default connect<MapProps, DispatchProps, unknown, AppStateType>(mapStateToProps, {
    addPost: actions.addPost, resetField
})(MyPosts);


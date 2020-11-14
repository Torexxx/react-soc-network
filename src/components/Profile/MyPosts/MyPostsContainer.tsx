import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer';
import MyPosts from "./MyPosts";
import {IState} from "../../../interfaces";
import {connect} from "react-redux";

// type MyPostsContainer = {
//     // posts: Array<IPost>
//     // newPostText: string
//     // dispatch(action: { type: string, payload?:{ newText: string } }): void
//     store2: Store<CombinedState<IState>>
// }

// const MyPostsContainer: React.FC = () => {
//
//   return ( <StoreContext.Consumer>
//           {
//               (store2) => {
//
//                   let state = store2.getState();
//
//                   const onAddPost = () => {
//                       store2.dispatch(addPostAC());
//                   }
//
//                   const onPostChange = (text: string) => {
//                       store2.dispatch(updateNewPostTextAC(text));
//                   }
//                   return (
//                       <MyPosts addPost={ onAddPost }
//                                updateNewPostText ={ onPostChange }
//                                posts={ state.profilePage.posts }
//                                newPostText={ state.profilePage.newPostText }  />
//                   )
//               }
//           }
//
//         </StoreContext.Consumer>
//   )
// }
//

let mapStateToProps = (state: IState) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => {
            dispatch(addPostAC());
        },
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostTextAC(text));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps )(MyPosts);

export default MyPostsContainer;
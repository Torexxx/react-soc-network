import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {IPost} from '../../../interfaces';
import AddPostReduxForm  from './AddPostForm/AddPostForm';
import {AddPostFormValues} from './AddPostForm/AddPostForm';

export type MapProps = {
    posts: Array<IPost>
}

export type DispatchProps = {
    addPost(newPostText: string): void
    resetField() : void
}

const MyPosts: React.FC<MapProps & DispatchProps> = (props) =>  {

    let {posts, addPost, resetField} = props;
    let postsElements = [...posts]
        .reverse()
        .map((p) => <Post key={p.id} {...p}/>)

    const addNewPost = (values: AddPostFormValues) => {
        addPost(values.newPostText);
        resetField();
    }
    return (
        <div className={s.myPostsWrapper}>
            <h3>My posts</h3>
            <div>
                <div>
                    <AddPostReduxForm onSubmit={addNewPost}/>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemoized = React.memo(MyPosts);

export default MyPostsMemoized;

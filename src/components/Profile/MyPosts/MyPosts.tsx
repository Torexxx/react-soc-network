import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {IPost} from '../../../interfaces';
import {Field, reduxForm } from "redux-form";

type MyPostsProps = {
    posts: Array<IPost> // Array<object>
    addPost(newPostText: any): void
}

const AddPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {/*  preventDefault*/}
            {/*Сбор данных */}
            {/*Вызов колбека*/}
            <Field name='newPostText' component ={'textarea'} />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostsReduxForm = reduxForm({form: 'postAddMessageForm'})(AddPostForm);

const MyPosts: React.FC<MyPostsProps> = ( { posts, addPost} ) => {

    let postsElements = posts.map((p) => <Post key={ p.id } { ...p }/>)

    const addNewPost = (values: any) => {
        addPost(values.newPostText);
    }

  return (
    <div className={ s.myPostsWrapper }>
        <h3>My posts</h3>
      <div>
          <div>
            <AddPostsReduxForm onSubmit={addNewPost} />
            {/*// когда форма засабмитится вызовет колбек и мы получим данные их этой формы.*/}
          </div>

      </div>
      <div className={ s.posts }>
          { postsElements }
      </div>
    </div>
  )
}

export default MyPosts;

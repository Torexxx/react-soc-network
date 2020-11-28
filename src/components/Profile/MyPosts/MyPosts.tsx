import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {IPost} from '../../../interfaces';
import {Field, reduxForm } from "redux-form";
import {maxLength, number, required} from "../../../utils/Form-validator";
import {TextArea} from "../../common/FormControls/FormControls";

type MyPostsProps = {
    posts: Array<IPost> // Array<object>
    addPost(newPostText: any): void
    resetField() : void
}

const maxLength15 = maxLength(15);

const AddPostForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {/*  preventDefault*/}
            {/*Сбор данных */}
            {/*Вызов колбека*/}
            <Field
                name='newPostText'
                component ={TextArea}
                placeholder="Ввелите текст поста"
                validate = {[required, number, maxLength15 ]}

            />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPosts: React.FC<MyPostsProps> = ( { posts, addPost, resetField} ) => {

    let postsElements = posts.map((p) => <Post key={ p.id } { ...p }/>)

    const addNewPost = (values: any) => {
        addPost(values.newPostText);
        resetField();
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

const AddPostsReduxForm = reduxForm({form: 'postAddMessageForm'})(AddPostForm);

export default MyPosts;

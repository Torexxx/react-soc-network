import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {IPost} from '../../../interfaces';

type MyPostsProps = {
    posts: Array<IPost> // Array<object>
    // addPost(newText:string): void
    newPostText: string
    // dispatch(action: { type: string, payload?:{ newText: string } }): void
    addPost(): void
    updateNewPostText(text: string): void

}

const MyPosts: React.FC<MyPostsProps> = ( { posts, newPostText, addPost, updateNewPostText} ) => {

    let postsElements = posts.map((p) => <Post key={ p.id } { ...p }/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPost = () => {
        // let text = newPostElement.current!.value;
            addPost();
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewPostText(e.target.value);
    }
    


  return (
    <div className={ s.myPostsWrapper }>
        <h3>My posts</h3>
      <div>
          <div>
            <textarea value={ newPostText } onChange={ onPostChange } ref={ newPostElement } />
          </div>
        <button onClick={ onAddPost }>Add post</button>
      </div>
      <div className={ s.posts }>
          { postsElements }
      </div>
    </div>
  )
}

export default MyPosts;

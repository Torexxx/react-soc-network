import React from 'react';
import s from './Post.module.css';

type PostProps = {
    likesCount: number
    message: string
}

const Post = ({likesCount, message}: PostProps) => {
  return (
    <div className={s.item}>
      <img src='https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg'  alt=''/>
        { message }
          <div>
        <span>like</span> { likesCount }
      </div>
    </div>
  )
}

export default Post;

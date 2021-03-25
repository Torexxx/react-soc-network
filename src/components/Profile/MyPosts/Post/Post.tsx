import React from 'react';
import s from './Post.module.css';

type Props = {
    likesCount: number
    message: string
}

const Post: React.FC<Props> = ({likesCount, message}) => {
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

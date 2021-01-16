import React from 'react';
import userPhoto from '../../assets/images/avatar.png';
import {NavLink} from "react-router-dom";
import style from './Users.module.css'

interface IUser {
    follow(userId: number) : void
    unfollow(userId: number) : void,
    followingInProgress: Array<number>
    user: {name: string, id: number, uniqueUrlName?: any, photos: {small: string, large: string},
          status: any, followed: boolean}
}

const User: React.FunctionComponent<IUser> = ({user, unfollow, follow, followingInProgress}) => {
    return (
     <div className={style.user}>
        <div>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img alt='avatar'
                         style={{width: '100px'}}
                         src={user.photos.small ? user.photos.small : userPhoto}/>
                </NavLink>
            </div>
            <div>{user.name}</div>
        </div>
        <div> {user.status}</div>
        <div style={{marginBottom: '10px'}}>
            { user.followed
                ? <button disabled={followingInProgress.some((id: number) => id === user.id)}  className={style.follow}
                          onClick={() => unfollow(user.id)}>
                    unfollow
                </button>
                : <button disabled={followingInProgress.some((id: number) => id === user.id )}  className={style.follow}
                          onClick={() => follow(user.id)}>
                    follow
                </button>
            }

        </div>
    </div>
    );
};

export default User;


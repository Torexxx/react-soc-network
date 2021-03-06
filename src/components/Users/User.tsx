import React from 'react';
import userPhoto from '../../assets/images/avatar.png';
import {NavLink} from "react-router-dom";
import style from './Users.module.css';
import {IUser} from "../../types/types";

type Props = {
    follow(userId: number): void
    unfollow(userId: number): void
    followingInProgress: Array<number>
    user: IUser
}

const User: React.FC<Props> = ({user, unfollow, follow, followingInProgress}) => {

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
            <div className={style.name}>{user.name}</div>
        </div>
         {user.status && <div className={style.status}> <b>Статус:</b> {user.status}</div>}
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


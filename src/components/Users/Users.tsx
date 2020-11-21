import React, {useEffect} from 'react';
import userPhoto from '../../assets/images/avatar.png';
import {IUser} from "../../interfaces";
import style from './Users.module.css'
import {Preloader} from "../Preloader/Preloader";
import {NavLink} from "react-router-dom";

interface IUsers {
    follow(userId: number) : void
    unfollow(userId: number) : void,
    getUsers(pageSize: number,currentPage: number ) : void

    users: Array<IUser>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean

    setCurrentPage(page: number): void
    toggleFollowingInProgress(isFetching: boolean, userId: number) : void
    followingInProgress: Array<number>
}

const Users: React.FunctionComponent<IUsers> = ({
    unfollow,
    follow,
    getUsers,
    users,
    pageSize,
    totalUsersCount,
    currentPage,
    setCurrentPage,
    isFetching,
    followingInProgress,
    toggleFollowingInProgress,
  }) => {

    useEffect(() => {
        getUsers(pageSize, currentPage)
    }, [currentPage])

    // const getUsers = () => {
    //     if (users.length === 0) {
    //         fetch('https://social-network.samuraijs.com/api/1.0/users',
    //             // {mode: 'no-cors', credentials: "omit"}
    //         )
    //             .then(response => response.json())
    //             .then(json => {
    //                 console.log(json.items)
    //                 setUsers(json.items)
    //             })
    //     }
    // }

    let pages = [];
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={style.users}>
            { isFetching ? <Preloader/>
                    :
                    <>
                        {pages.map(p => <span key={p} onClick={() => onPageChanged(p)}
                                              className={style.currentPage}>{p}</span>)}
                        {users.map((user: IUser) => {
                            return <div key={user.id}>
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
                                                    ? <button disabled={followingInProgress.some((id: number) => id === user.id)}  className={'btn btn-primary'}
                                                        onClick={() => unfollow(user.id)}>
                                                        unfollow
                                                    </button>
                                                    : <button disabled={followingInProgress.some((id: number) => id === user.id )}  className={'btn btn-primary'}
                                                              onClick={() => follow(user.id)}>
                                                        follow
                                                    </button>
                                            }

                                        </div>
                                    </div>
                        })}
                    </>
            }
        </div>
    );
};

export default Users;

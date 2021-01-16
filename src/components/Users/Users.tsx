import React, {useEffect} from 'react';
import {IUser} from "../../interfaces";
import style from './Users.module.css'
import {Preloader} from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from './User';

interface IUsers {
    follow(userId: number) : void
    unfollow(userId: number) : void,
    getRequestUsers(pageNumber: number, pageSize: number ) : void
    users: Array<IUser>
    pageSize: number
    totalItemsCount: number
    pageNumber: number
    isFetching: boolean
    toggleFollowingInProgress(isFetching: boolean, userId: number) : void
    followingInProgress: Array<number>,
    portionSize: number
}

const Users: React.FunctionComponent<IUsers> = React.memo( ({
    unfollow,
    follow,
    getRequestUsers,
    users,
    pageSize,
    totalItemsCount,
    pageNumber,
    isFetching,
    followingInProgress,
    portionSize
  }) => {

    useEffect(() => {
        getRequestUsers(pageNumber, pageSize);
    }, [pageNumber])

    const onPageChanged = React.useCallback((pageNumber: number) => {
        getRequestUsers(pageNumber, pageSize)
    }, [])

    return (
        <div className={style.users}>
            <Paginator
                totalItemsCount ={totalItemsCount}
                pageSize = {pageSize}
                onPageChanged = {onPageChanged}
                pageNumber={pageNumber}
                portionSize={ portionSize}
            />
            { isFetching ? <Preloader/>
                    :
                    <>

                        <div className={style.usersWrapper}>
                            {users.map((user: IUser) => {
                               return <User
                                   key = {user.id}
                                   user = {user}
                                   unfollow = {unfollow}
                                   follow = {follow}
                                   followingInProgress = {followingInProgress}
                               />
                            })}
                        </div>
                    </>
            }
        </div>
    );
});

export default Users;

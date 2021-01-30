import React, {useEffect} from 'react';
import {IUser} from "../../types/types";
import style from './Users.module.css';
import {Preloader} from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from './User';
import { PropsType } from './UsersContainer';

const Users: React.FC<PropsType> = React.memo( ({
    unfollow,
    follow,
    getRequestUsers,
    users,
    pageSize,
    totalItemsCount,
    pageNumber,
    isFetching,
    followingInProgress,
    portionSize,
    titleText

  }) => {

    useEffect(() => {
        getRequestUsers(pageNumber, pageSize);
    }, [pageNumber, getRequestUsers, pageSize])

    const onPageChanged = React.useCallback((pageNumber: number) => {
        getRequestUsers(pageNumber, pageSize)
    }, [getRequestUsers, pageSize])

    return (

        <div className={style.users}>
            <h1>{titleText}</h1>
            <Paginator
                totalItemsCount ={totalItemsCount}
                pageSize = {pageSize}
                onPageChanged = {onPageChanged}
                pageNumber={pageNumber}
                portionSize={ portionSize}
            />
            { isFetching
                    ? <Preloader/>
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

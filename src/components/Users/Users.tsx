import React from 'react';
import {IUser} from "../../types/types";
import style from './Users.module.css';
import {Preloader} from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from './User';
import { PropsType } from './UsersContainer';
import { FilterType } from '../../redux/users-reducer';
import { UsersSearchForm } from './UsersSearchForm';

let {useEffect, useCallback} = React;

const Users: React.FC<PropsType> = React.memo(({
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
    titleText,
    filter

  }) => {

    useEffect(() => {
        getRequestUsers(pageNumber, pageSize, filter);
    }, [])

    const onPageChanged = useCallback((pageNumber: number) => {
        getRequestUsers(pageNumber, pageSize, filter)
    }, [getRequestUsers, pageSize, filter])

    const onFilterChange = (filter: FilterType) => {

        let filtered;
        if (typeof filter.friend === 'string') {
             filtered = JSON.parse(filter.friend);
        }
        console.log(filtered)
        getRequestUsers(1, pageSize, filtered);
    }

    return (

        <div className={style.users}>
            <h1>{titleText}</h1>

            <UsersSearchForm onFilterChange = {onFilterChange} />
            <Paginator
                totalItemsCount ={totalItemsCount}
                pageSize = {pageSize}
                onPageChanged = {onPageChanged}
                pageNumber={pageNumber}
                portionSize={portionSize}
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

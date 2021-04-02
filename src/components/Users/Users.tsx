import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IUser} from "../../types/types";
import style from './Users.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from './User';
import { FilterType, getRequestUsers, follow, unfollow } from '../../redux/users-reducer';
import { UsersSearchForm } from './UsersSearchForm';
import {
    getCurrentPage, getFilteredResult, getFollowingInProgress,
    getPageSize,
    getPortionSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/user-selectors";


let {useEffect, useCallback} = React;

export const Users: React.FC = React.memo((props) => {

    const totalItemsCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const pageNumber = useSelector(getCurrentPage);  //const currentPage dont work
    const users = useSelector<any, any>(getUsers);
    const portionSize = useSelector<any, any>(getPortionSize);
    const followingInProgress = useSelector<any, any>(getFollowingInProgress);
    const filter = useSelector<any, any>(getFilteredResult);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRequestUsers(pageNumber, pageSize, filter));
    }, [])

    const onPageChanged = useCallback((pageNumber: number) => {
        dispatch(getRequestUsers(pageNumber, pageSize, filter));
    }, [getRequestUsers, pageSize, filter])

    const onFilterChange = (filter: FilterType) => {
        dispatch(getRequestUsers(1, pageSize, filter));
    }

    const followU = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowU = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div className={style.users}>

            <UsersSearchForm onFilterChange = {onFilterChange} />
            <Paginator
                totalItemsCount = {totalItemsCount}
                pageSize = {pageSize}
                onPageChanged = {onPageChanged}
                pageNumber = {pageNumber}
                portionSize = {portionSize}
            />

            <div className={style.usersWrapper}>
                {users.map((user: IUser) => <User key = {user.id}
                                                  user = {user}
                                                  unfollow = {unfollowU}
                                                  follow = {followU}
                                                  followingInProgress = {followingInProgress}
                    />
                )}
            </div>
        </div>
    );
});


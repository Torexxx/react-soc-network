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
import { useHistory } from 'react-router-dom';
import * as queryString from "querystring";

let {useEffect, useCallback} = React;

type QueryParamsType = { page?: string, term?: string, friend?: string };
export const Users: React.FC = React.memo((props) => {

    const totalItemsCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const users = useSelector(getUsers);
    const portionSize = useSelector(getPortionSize);
    const followingInProgress = useSelector(getFollowingInProgress);
    const filter = useSelector(getFilteredResult);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType;

        let actualPage = currentPage;
        let actualFilter = filter;

        if (!!parsed.page) actualPage = Number(parsed.page);
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case "null": actualFilter = {...actualFilter, friend: null}
                break
            case "true": actualFilter = {...actualFilter, friend: true}
                break
            case "false": actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(getRequestUsers(actualPage, pageSize, actualFilter));
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);

        history.push({
            pathname: window.location.pathname,
            search: queryString.stringify(query)
            // search: `?page=${currentPage}&term=${filter.term}&friend=${filter.friend}`
        });
    }, [filter, currentPage])

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
                currentPage = {currentPage}
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


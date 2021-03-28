import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";

import {FilterType, follow, getRequestUsers, unfollow} from "../../redux/users-reducer";
import {
    getCurrentPage,
    getFilteredResult,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsers,

} from "../../redux/user-selectors";
import { AppStateType } from "../../redux/redux-store";
import {IUser} from "../../types/types";

type MapStatePropsType = {
    users: Array<IUser>
    pageSize: number
    totalItemsCount: number
    pageNumber: number
    isFetching: boolean
    followingInProgress: Array<number>
    portionSize: number
    filter: FilterType
};
type MapDispatchPropsType = {
    follow(userId: number): void
    unfollow(userId: number): void
    getRequestUsers(pageNumber: number, pageSize: number, filter: FilterType ): void
};
type OwnType  = {
    titleText: string
};

export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnType;

const UsersContainer: React.FC<PropsType> = (props) => {
    return (
        <Users
            users={props.users}
            pageSize={props.pageSize}
            totalItemsCount={props.totalItemsCount}
            pageNumber={props.pageNumber}
            isFetching={props.isFetching}
            followingInProgress={props.followingInProgress}
            portionSize={props.portionSize}
            follow={props.follow}
            unfollow={props.unfollow}
            getRequestUsers={props.getRequestUsers}
            titleText={props.titleText}
            filter = {props.filter}
        />
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        pageNumber: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state),
        filter: getFilteredResult(state)
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnType, AppStateType>(
    mapStateToProps, {
    follow,
    unfollow,
    getRequestUsers

})(UsersContainer);


// const connector = connect(
//     mapStateToProps, {
//         follow,
//         unfollow,
//         getRequestUsers,
//     })
// type PropsFromRedux = ConnectedProps<typeof connector>;
// type Props = PropsFromRedux & OwnType;
//
//
// export default connector(UsersContainer);

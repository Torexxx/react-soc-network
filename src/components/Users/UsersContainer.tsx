import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {follow, getRequestUsers, unfollow} from "../../redux/users-reducer";
import {
    getCurrentPage,
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
};
type MapDispatchPropsType = {
    follow(userId: number): void
    unfollow(userId: number): void
    getRequestUsers(pageNumber: number, pageSize: number, term: string ): void
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
        portionSize: getPortionSize(state)
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnType, AppStateType>(
    mapStateToProps, {
    follow,
    unfollow,
    getRequestUsers,
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

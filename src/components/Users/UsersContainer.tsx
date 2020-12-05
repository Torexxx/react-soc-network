import {connect} from "react-redux";
import Users from "./Users";
import {follow, getRequestUsers, setCurrentPage, toggleFollowingInProgress, unfollow} from "../../redux/users-reducer";

import {IState} from "../../interfaces";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,

} from "../../redux/user-selectors";

let mapStateToProps = (state: IState) => {
    // console.log('mapStateToProps USERS')
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    getRequestUsers,
    setCurrentPage,
    toggleFollowingInProgress
})(Users);

export default UsersContainer;

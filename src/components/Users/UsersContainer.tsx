import {connect} from "react-redux";
import Users from "./Users";
import {follow, getRequestUsers, setCurrentPage, toggleFollowingInProgress, unfollow} from "../../redux/users-reducer";
import {IState} from "../../interfaces";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsers,

} from "../../redux/user-selectors";

let mapStateToProps = (state: IState) => {
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

export default connect(mapStateToProps, {
    follow,
    unfollow,
    getRequestUsers,
    setCurrentPage,
    toggleFollowingInProgress
})(Users);


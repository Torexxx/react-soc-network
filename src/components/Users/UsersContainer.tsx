import {connect} from "react-redux";
import Users from "./Users";
import {
    follow,
    unfollow,
    getUsers,
    setCurrentPage,
    toggleFollowingInProgress
} from "../../redux/users-reducer";

import {IState} from "../../interfaces";
import { withAuthRedirect } from "../hoc/withAuthRedirect";

let mapStateToProps = (state: IState) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps = (dispatch: Function) => {
//     return {
//         followToggle: (userId: number) => {
//             dispatch(followToggleAC(userId))
//         },
//         setUsers: (users: Array<IUser>) => {
//             dispatch(setUsersAC(users))
//         },
//         setPage: (page: number) => {
//             dispatch(setCurrentPageAC(page))
//         },
//         setTotalUsersCount: (usersCount: number) => {
//             dispatch(setTotalUsersCountAC(usersCount))
//         },
//         showLoader: () => {
//             dispatch(showLoaderAC())
//         },
//         hideLoader: () => {
//             dispatch(hideLoaderAC())
//         },
//     }
// }



const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    getUsers,
    setCurrentPage,
    toggleFollowingInProgress
})(Users);

export default withAuthRedirect(UsersContainer);

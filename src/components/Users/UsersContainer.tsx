import {connect} from "react-redux";
import Users from "./Users";
import {
    followToggle,
    hideLoader,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    showLoader
} from "../../redux/users-reducer";
import {IState, IUser} from "../../interfaces";

let mapStateToProps = (state: IState) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
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
    followToggle,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    showLoader,
    hideLoader,
})(Users);

export default UsersContainer;

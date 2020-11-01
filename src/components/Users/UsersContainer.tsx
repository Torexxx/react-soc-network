import {connect} from "react-redux";
import Users from "./Users";
import {followToggleAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC} from "../../redux/users-reducer";
import {IState, IUser} from "../../interfaces";

let mapStateToProps = (state: IState) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch: Function) => {
    return {
        followToggle: (userId: number) => {
            dispatch(followToggleAC(userId))
        },
        setUsers: (users: Array<IUser>) => {
            dispatch(setUsersAC(users))
        },
        setPage: (page: number) => {
            dispatch(setCurrentPageAC(page))
        },
        setTotalUsersCount: (usersCount: number) => {
            dispatch(setTotalUsersCountAC(usersCount))
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;

import {connect} from "react-redux";
import Users from "./Users";
import {followToggleAC, setUsersAC} from "../../redux/users-reducer";
import {IState, IUser} from "../../interfaces";

let mapStateToProps = (state: IState) => {
    return {
        users: state.usersPage.users
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
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;

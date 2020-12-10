import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../hoc/withAuthRedirect";

interface IProps extends RouteComponentProps<any> {
    getUserProfile(userId: number): void
    updateStatus(status: string): void
    getStatus(userId: number): void
    profile: any
    status: string
    authorizedUserId: number
    isAuth: boolean
}
class ProfileContainer extends React.Component<IProps>{

    componentDidMount() {
       let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        if (userId) {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);  //getUsersStatus
        }
    }
     render() {
        return (
                <Profile {...this.props} profile = {this.props.profile} status={this.props.status}  updateStatus = {this.props.updateStatus} />
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

 export default withAuthRedirect(connect(mapStateToProps, {getUserProfile, getStatus, updateStatus})(withRouter(ProfileContainer)));

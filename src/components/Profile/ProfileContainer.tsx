import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, updateStatus, saveProfile} from "../../redux/profile-reducer";
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
    savePhoto(file: any): void
    saveProfile(profile: any): void
    profileUpdateStatus: string
}
class ProfileContainer extends React.Component<IProps>{


    updateProfilePhoto() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        if (userId) {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.updateProfilePhoto();
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.updateProfilePhoto();
        }
    }

    render() {

        return (
                <Profile {...this.props}
                         profile = {this.props.profile}
                         status={this.props.status}
                         updateStatus = {this.props.updateStatus}
                         isOwner = {!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                         saveProfile = {this.props.saveProfile}
                         profileUpdateStatus = {this.props.profileUpdateStatus}
                />
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        profileUpdateStatus: state.profilePage.profileUpdateStatus,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,

    }
}

export default withAuthRedirect(connect(mapStateToProps,
    {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile})(withRouter(ProfileContainer)));

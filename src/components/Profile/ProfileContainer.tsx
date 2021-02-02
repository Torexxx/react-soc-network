import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, updateStatus, saveProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

interface IProps extends RouteComponentProps<any> {
    getUserProfile(userId: number): void
    updateStatus(status: string): void
    getStatus(userId: number): void
    profile: ProfileType
    status: string
    authorizedUserId: number
    isAuth: boolean
    savePhoto(file: Blob): void
    saveProfile(profile: ProfileType): void
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
type MapStatePropsType = {
    profile: ProfileType | any
    status: string
    profileUpdateStatus: string
    authorizedUserId: number | any
    isAuth: boolean
};
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: Blob) => void
    saveProfile: (profile: ProfileType) => void
};

const mapStateToProps = (state: AppStateType): MapStatePropsType  => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        profileUpdateStatus: state.profilePage.profileUpdateStatus,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

export default withAuthRedirect(connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps,
    {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile})(withRouter(ProfileContainer)));

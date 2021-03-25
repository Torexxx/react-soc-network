import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, updateStatus, saveProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import { compose } from 'redux';

type PathParamsType = {
    userId: string
}
type MapPropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
};

type Props = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<Props>{

    updateProfilePhoto() {
        let userId : number | null = +this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
                debugger
            }
        }
        if (!userId) {
            console.error('id should be exist in URI params or in state (authorizedUserId)')
            throw new Error('id should be exist in URI params or in state (authorizedUserId)')
        } else {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.updateProfilePhoto();
    }

    componentDidUpdate(prevProps: Props, prevState: Props) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            debugger
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

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        profileUpdateStatus: state.profilePage.profileUpdateStatus,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);

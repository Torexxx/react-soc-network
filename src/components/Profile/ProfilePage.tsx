import React, {useEffect, useRef} from 'react';
import Profile from "./Profile";
import {connect, useDispatch, useSelector} from "react-redux";
import {getStatus, getUserProfile, savePhoto, updateStatus, saveProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import { compose } from 'redux';

type PathParamsType = {
    userId: string
}

type Props =  RouteComponentProps<PathParamsType>;

const ProfilePage: React.FC<Props> = (props) => {

    const dispatch = useDispatch();

    function usePrevious(value: any) {
        const ref = useRef();
        useEffect(() => {

            ref.current = value;
        });
        return ref.current;
    }

    // const prevAmount = usePrevious(props);




    // function areEqual(prevProps: Props, nextProps: Props) {
    //     if (prevProps.match.params.userId !== props.match.params.userId) {
    //         updateProfilePhoto();
    //     }
    // }

    const updateStatusPage = (status: string) => {
        dispatch(updateStatus(status));
    }
    const savePhotoPage  = (file: File) => {
        dispatch(savePhoto(file));
    }
    const saveProfilePage  = (profile: ProfileType) => {
        dispatch(saveProfile(profile));
    }

    const profile = useSelector((state : AppStateType) => state.profilePage.profile);
    const status = useSelector((state : AppStateType) => state.profilePage.status);
    const profileUpdateStatus = useSelector((state : AppStateType) => state.profilePage.profileUpdateStatus);
    const authorizedUserId = useSelector((state : AppStateType) => state.auth.userId);
    // const isAuth = useSelector((state : AppStateType) => state.auth.isAuth);


    useEffect(() => {
        updateProfilePhoto();
    }, [])

    const updateProfilePhoto = () => {
        let userId : number | null = +props.match.params.userId;

        if (!userId) {
            userId = authorizedUserId;
            if (!userId) {
                props.history.push('/login');
            }
        }
        if (!userId) {
            console.error('id should be exist in URI params or in state (authorizedUserId)')
            throw new Error('id should be exist in URI params or in state (authorizedUserId)')
        } else {
            dispatch(getUserProfile(userId));
            dispatch(getStatus(userId));
        }
    }

    return (
        <Profile {...props}
                 profile = {profile}
                 status={status}
                 updateStatus = {updateStatusPage}
                 isOwner = {!props.match.params.userId}
                 savePhoto={savePhotoPage}
                 saveProfile = {saveProfilePage}
                 profileUpdateStatus = {profileUpdateStatus}
        />
    )

    // componentDidUpdate(prevProps: Props, prevState: Props) {
    //     if (prevProps.match.params.userId !== props.match.params.userId) {
    //         updateProfilePhoto();
    //     }
    // }


};

export default withAuthRedirect(withRouter(ProfilePage));
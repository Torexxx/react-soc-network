import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import avatar from "../../../assets/images/avatar.png"

class ProfileInfo extends React.Component<any> {
    // shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    //
    //
    //     console.log('---------------',this.props)
    //     return nextProps != this.props || nextState != this.state
    // }


    render() {
        let {profile, status, updateStatus} = this.props;

        // console.log('profile')

        if (!profile) {
            return <Preloader/>

        } else {
            return (
                <div className={s.profileInfoWrapper}>
                    <div className={s.wallpaper}>
                        <div>{profile && profile.fullName}</div>
                        <div>{profile && profile.aboutMe}</div>
                        <div>{profile && profile.lookingForAJobDescription}</div>
                    </div>
                    <div>
                        <img className={s.avatar} alt=''
                             src={profile && profile.photos.large ? profile.photos.large : avatar}/>

                        <div>{profile && profile.fullname}</div>

                        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                    </div>
                </div>
            )
        }
    }
}

export default ProfileInfo;

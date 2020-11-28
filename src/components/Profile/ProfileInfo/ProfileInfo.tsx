import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import avatar from "../../../assets/images/avatar.png"

const ProfileInfo = ( {profile, status, updateStatus }:any) => {
    console.log(profile)

    if (!profile) {
        return <Preloader />

    } else {
        return (
            <div className={s.profileInfoWrapper}>
                <div className={s.wallpaper}>
                    <div>{profile && profile.fullName}</div>
                    <div>{profile && profile.aboutMe}</div>
                    <div>{profile && profile.lookingForAJobDescription}</div>
                </div>
                <div>
                    <img className={s.avatar} alt='' src={profile && profile.photos.large ? profile.photos.large : avatar }/>

                    <div>{profile && profile.fullname}</div>

                    <ProfileStatus status ={ status } updateStatus = {updateStatus} />
                </div>
            </div>
        )
    }
}

export default ProfileInfo;

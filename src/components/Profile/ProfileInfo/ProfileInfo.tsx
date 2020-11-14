import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../Preloader/Preloader";

const ProfileInfo = ( {profile}:any) => {

    if (!profile) {
        return <Preloader />

    } else {
        console.log(1)
        return (
            <div className={s.profileInfoWrapper}>
                <div className={s.wallpaper}>
                    <div>{profile && profile.fullName}</div>
                    <div>{profile && profile.aboutMe}</div>
                    <div>{profile && profile.lookingForAJobDescription}</div>
                </div>
                <div>
                    <img alt='' src={profile && profile.photos.large}/>
                    ava + description!!
                    <div>{profile && profile.fullname}</div>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;
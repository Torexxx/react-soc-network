import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import avatar from "../../../assets/images/avatar.png"
import ProfileData from "./ProfileData";
import ProfileDataReduxForm from './ProfileDataForm';

export const Contacts = ({contactTitle, contactValue}: any) => {
    return <div className={s.contacts}>
        <b>{contactTitle}</b> : {contactValue}
    </div>
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile, profileUpdateStatus, ...props }: any) => {

    interface Event<T = EventTarget> {
        target: T;
    }

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (profileUpdateStatus === 'success') {
            setEditMode(false);
        }
    })

    const goToEditMode = () => {
        setEditMode(true);
    }

    const profileInfoSubmit =  (formData: any) => {
        saveProfile(formData)
        // if profileUpdateStatus === success  => setEditMode(false);

        // saveProfile(formData)
        //     .then(() => {
        //         setEditMode(false);
        //     });
    }

    const onMainPhotoSelected = (e: Event<HTMLInputElement>) => {
        if (e.target.files!.length) {
            savePhoto(e.target.files![0]);
        }
    }

    if (!profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <img className={s.avatar} alt=''
                     src={profile && profile.photos.large ? profile.photos.large : avatar}/>

                <div>{isOwner && <input onChange={onMainPhotoSelected} type='file'/>}</div>

                <div className={s.wallpaper}>
                    {
                        editMode
                            ? <ProfileDataReduxForm {...props} initialValues={profile} onSubmit={profileInfoSubmit} profile={profile}  />
                            : <ProfileData profile={profile} goToEditMode={goToEditMode} />
                    }
                </div>

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner}/>
            </div>
        )
    }
}

export default ProfileInfo;

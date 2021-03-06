import React, {ReactNode, useEffect, useState} from 'react';
import { ChangeEvent } from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import avatar from "../../../assets/images/avatar.png"
import ProfileData from "./ProfileData";
import ProfileDataReduxForm  from './ProfileDataForm';
import {ProfileType} from "../../../types/types";

type ContactsProps = {
    contactTitle: string
    contactValue: string | ReactNode
}
export const Contacts:React.FC<ContactsProps> = ({contactTitle, contactValue}) => {
    return <div className={s.contacts}>
        <b>{contactTitle}</b> : {contactValue}
    </div>
}

type Props = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => void
    profileUpdateStatus: string
}

const ProfileInfo: React.FC<Props> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile, profileUpdateStatus, ...props }) => {

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (profileUpdateStatus === 'success') {
            setEditMode(false);
        }
    }, [profileUpdateStatus])

    const goToEditMode = () => {
        setEditMode(true);
    }

    const profileInfoSubmit = (formData: ProfileType) => {
        saveProfile(formData);
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
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
                            : <ProfileData profile={profile} isOwner = {isOwner} goToEditMode={goToEditMode} />
                    }
                </div>

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner}/>
            </div>
        )
    }
}

export default ProfileInfo;

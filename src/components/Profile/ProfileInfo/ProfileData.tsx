import s from "./ProfileInfo.module.css";
import React from "react";
import {Contacts} from "./ProfileInfo";
import {ContactsType, ProfileType} from "../../../types/types";

type Props = {
    profile: ProfileType
    goToEditMode: () => void
    isOwner: boolean
}

const ProfileData: React.FC<Props> = ({profile, goToEditMode, isOwner}) => {
    return (
        <>
            {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
            <div className={s.editField}>
                <b>Full Name: </b>
                <div>{profile.fullName}</div>
            </div>

            <div className={s.editField}>
                <b>Looking for a job: </b>
                <div>{profile.lookingForAJob ? 'yes' : 'no'}</div>
            </div>
            {profile.lookingForAJob &&
            <div className={s.editField}>
                <b>My professional skills: </b>
                <div>{profile.lookingForAJob && profile.lookingForAJobDescription}</div>
            </div>
            }
            <div><b>About me: </b>{profile.aboutMe}</div>

            <div>
                <b>Contacts: </b> {
                Object
                .keys(profile.contacts)
                .map((key)=> {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType] } />
            })}

            </div>
        </>
    )
}

export default ProfileData;
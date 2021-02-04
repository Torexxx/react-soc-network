import s from "./ProfileInfo.module.css";
import React from "react";
import {Contacts} from "./ProfileInfo";

const ProfileData: React.FC<any> = ({profile, goToEditMode}) => {

    return (
        <>
            <button onClick={goToEditMode}>Edit</button>
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
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}

            </div>
        </>
    )
}

export default ProfileData;
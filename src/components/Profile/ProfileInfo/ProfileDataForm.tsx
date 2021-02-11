import s from "./ProfileInfo.module.css";
import { fieldCreator, Input, TextArea} from "../../common/FormControls/FormControls";
import {Field, InjectedFormProps} from "redux-form";
import {reduxForm} from "redux-form";
import React from "react";
import { Contacts } from "./ProfileInfo";
import {required} from "../../../utils/Form-validator";
import {ProfileType} from "../../../types/types";

type ProfileDataFormOwnProps = {
    profile: ProfileType
}
type ProfileDataFormValuesKeysType = Extract<keyof ProfileDataFormValuesType, string>;
type AllProfileDataFormProps = InjectedFormProps<ProfileDataFormValuesType, ProfileDataFormOwnProps> & ProfileDataFormOwnProps;

export type ProfileDataFormValuesType = {
    fullName: string
    lookingForAJob: string
    lookingForAJobDescription: string
    aboutMe: string
};

const ProfileDataForm: React.FC<AllProfileDataFormProps> = ({profile, handleSubmit, error }) => {

    // console.log(handleSubmit) передает reduxForm и связывает с тем что мы передали в ProfileDataReduxForm  (onSubmit={profileInfoSubmit} )

    return (
          <form className={s.profileInfoWrapper} onSubmit={handleSubmit}>
              {error ? <div className={s.commonErrorText}>{error}</div> : ''}
            <button>Save</button>
            <div className={s.editField}>
                {fieldCreator<ProfileDataFormValuesKeysType>('fullName', Input,{}, [required], undefined, 'Full Name: ')}
            </div>
            <div className={s.editField}>
                {fieldCreator<ProfileDataFormValuesKeysType>('lookingForAJob', Input,{type: 'checkbox'}, [], undefined, 'Looking for a job: ')}
            </div>
            {profile.lookingForAJob &&
            <div className={s.editField}>
                {fieldCreator<ProfileDataFormValuesKeysType>('lookingForAJobDescription', Input,{}, [], undefined, 'My professional skills: ')}
            </div>
            }
                {fieldCreator<ProfileDataFormValuesKeysType>('aboutMe', TextArea, {},[required], undefined, 'about me: ')}
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key}
                                 contactTitle={key}
                                 contactValue={<Field name={'contacts.' + key} component={Input} type="text"/>}
                />
            })}

            </div>
        </form >
    )
}

const ProfileDataReduxForm = reduxForm<ProfileDataFormValuesType, ProfileDataFormOwnProps>({form: 'profile-info', enableReinitialize: true })(ProfileDataForm);

export default ProfileDataReduxForm;
import s from "./ProfileInfo.module.css";
import {fieldCreator, GetStringKeys, Input, TextArea} from "../../common/FormControls/FormControls";
import {Field, InjectedFormProps} from "redux-form";
import {reduxForm} from "redux-form";
import React from "react";
import { Contacts } from "./ProfileInfo";
import {required} from "../../../utils/Form-validator";
import {ProfileType} from "../../../types/types";

type Props = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, Props> & Props> = ({profile, handleSubmit, error }) => {

    return (
          <form className={s.profileInfoWrapper} onSubmit={handleSubmit}>
              {error ? <div className={s.commonErrorText}>{error}</div> : ''}
            <button>Save</button>
            <div className={s.editField}>
                {fieldCreator<ProfileTypeKeys>('fullName', Input,{}, [required], undefined, 'Full Name: ')}
            </div>
            <div className={s.editField}>
                {fieldCreator<ProfileTypeKeys>('lookingForAJob', Input,{type: 'checkbox'}, [], undefined, 'Looking for a job: ')}
            </div>
            {profile.lookingForAJob &&
            <div className={s.editField}>
                {fieldCreator<ProfileTypeKeys>('lookingForAJobDescription', Input,{}, [], undefined, 'My professional skills: ')}
            </div>
            }
                {fieldCreator<ProfileTypeKeys>('aboutMe', TextArea, {},[required], undefined, 'about me: ')}
            <div>
                <b>
                    : </b> {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key}
                                 contactTitle={key}
                                 contactValue={<Field name={'contacts.' + key} component={Input} type="text"/>}
                />
            })}

            </div>
        </form >
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, Props>({form: 'profile-info', enableReinitialize: true })(ProfileDataForm);

export default ProfileDataReduxForm;

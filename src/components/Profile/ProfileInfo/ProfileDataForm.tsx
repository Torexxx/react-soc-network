import s from "./ProfileInfo.module.css";
import {FieldCreator, fieldCreator, Input, TextArea} from "../../common/FormControls/FormControls";
import {Field} from "redux-form";
import {reduxForm} from "redux-form";
import React from "react";
import { Contacts } from "./ProfileInfo";
import {required} from "../../../utils/Form-validator";


const ProfileDataForm = ({profile, handleSubmit, error }: any) => {

    // console.log(handleSubmit) передает  reduxForm и связывает с тем что мы передали в ProfileDataReduxForm  (onSubmit={profileInfoSubmit} )
    // console.log(rest)
    return (
          <form className={s.profileInfoWrapper} onSubmit={handleSubmit}>
              {
                  error ? <div className={s.commonErrorText}>{error}</div>   // не срабатывает?
                      : ''
              }
            <button>Save</button>
            <div className={s.editField}>
                <b>Full Name: </b>
                {fieldCreator('fullName', Input,undefined, [required], null)}
                {/*можно передать ровно столько аргументов сколько указано*/}
                {/*<FieldCreator name='fullName' component={Input}/>*/}
                {/*//можно передать либо 0 либо сколько угодно.. т.к по дефолту приходит пустой пропс*/}
            </div>

            <div className={s.editField}>
                <b>Looking for a job: </b>
                <FieldCreator name='lookingForAJob' component={Input} type='checkbox'/>
            </div>
            {profile.lookingForAJob &&
            <div className={s.editField}>
                <b>My professional skills: </b>
                <FieldCreator name='lookingForAJobDescription' component={Input}/>
            </div>
            }
            <div> <b>about Me: </b>
                {fieldCreator('aboutMe', TextArea,undefined,[required], null)}
            </div>

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

const ProfileDataReduxForm = reduxForm({form: 'profile-info', enableReinitialize: true })(ProfileDataForm)

export default ProfileDataReduxForm;
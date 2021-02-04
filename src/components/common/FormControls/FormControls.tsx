import s from "../../Profile/MyPosts/MyPosts.module.css";
import React from "react";
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/Form-validator";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error} , children }) => {
    const hasError = error && touched;
    return (
            <div className={s.formControl + ' ' + (hasError ? s.error : '')}>

                    {children}
                    {/*<rest.element {...input}  />*/}


                {hasError && <span>{error}</span>}
            </div>
        )
}

export function fieldCreator<FormKeysType extends string> (
                             name: FormKeysType,
                             component: React.FC<WrappedFieldProps>,
                             props={},
                             validators: Array<FieldValidatorType>,
                             placeholder: string | undefined,
                             text='') {

                    return <div className={s.fieldWrapper}>{text}
                                <Field
                                    name={name}
                                    component={component}
                                    placeholder={placeholder}
                                    validate = {validators}
                                    {...props}
                                />
                            </div>
}
export const FieldCreator = ({name, component, type='text', placeholder}: any) => {
    return <Field
        name={name}
        component={component}
        type={type}

        // validate = {[required]}
    />
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    let {input, meta, ...restProps} = props;

    return  <FormControl {...props}><input {...input} {...restProps} /> </FormControl>
};
export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    let {input, meta, ...restProps} = props
    return  <FormControl  {...props}><textarea  {...input} {...restProps} /> </FormControl>
};
// export const TextArea: React.FC<WrappedFieldProps> = (props) => <FormControl {...props} element = {'textarea'} />


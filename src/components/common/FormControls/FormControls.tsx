import s from "../../Profile/MyPosts/MyPosts.module.css";
import React from "react";
import {Field} from "redux-form";
import {FieldValidatorType} from "../../../utils/Form-validator";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form/lib/Field";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

type FormControlParamsType ={
    meta: {
        touched: boolean
        error?: string
    }
    children: React.ReactNode
}
type FormControlType<T> = (params: T ) => JSX.Element
// FormControlType<FormControlParamsType>
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
 // <T extends string>  ---- литеральный тип string (String Literal)
export function fieldCreator<T extends string> (
                             name: T,
                             component: React.FC<WrappedFieldProps>,
                             props={},
                             validators: Array<FieldValidatorType>,
                             placeholder: string | undefined,
                             text= '') {

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

export const Input: React.FC<WrappedFieldProps> = (props) => {
    let {input, meta, ...restProps} = props;

    return  <FormControl {...props}><input {...input} {...restProps} /> </FormControl>
};
export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    let {input, meta, ...restProps} = props
    return  <FormControl  {...props}><textarea  {...input} {...restProps} /> </FormControl>
};
// export const TextArea: React.FC<WrappedFieldProps> = (props) => <FormControl {...props} element = {'textarea'} />


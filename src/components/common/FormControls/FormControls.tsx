import s from "../../Profile/MyPosts/MyPosts.module.css";
import React from "react";

//
// export const FormControl = ({  input, meta: { touched, error }, ...rest }: any) => {
//     const hasError = error && touched;
//     return (
//         <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//             {rest.children}
//             {hasError && <span>{error}</span>}
//         </div>
//     )
// }
//
// export const Input = (props: any) => {
//
//     const {input, meta, ...restProps} = props
//     return (
//         <FormControl {...props}>
//             <input {...input} {...restProps} />
//         </FormControl>
//     )
// }
// export const TextArea = (props: any) => <FormControl {...props} Element = {'textarea'} />

export const FormControl = ({ input, meta: { touched, error }, ...rest }: any) => {
    const hasError = error && touched;
    return (
            <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
                <div>
                    <rest.element {...input} {...rest} />
                </div>

                {hasError && <span>{error}</span>}
            </div>
        )
}

export const Input = (props: any) => <FormControl {...props} element = {'input'} />
export const TextArea = (props: any) => <FormControl {...props} element = {'textarea'} />


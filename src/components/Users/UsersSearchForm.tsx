import React from "react";
import {Formik, FormikHelpers } from "formik";
import { FilterType } from "../../redux/users-reducer";

const validateForm = (values: any) => {
    const errors = {};

    return errors;
}
type Props  = {
    onFilterChange: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<Props> = ({onFilterChange}) => {

    const submit = (values: FilterType, { setSubmitting }: FormikHelpers<FilterType>) => {
        setTimeout(() => {
            onFilterChange(values);
            setSubmitting(false);
        }, 400);
    }
    return (
        <div>
            <Formik
                initialValues={{ term: ''}}
                validate={validateForm}
                onSubmit={submit}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => {
                    console.log(isSubmitting)
                    return (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="term"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.term}
                            />
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )

                }}
            </Formik>
        </div>
    )
}

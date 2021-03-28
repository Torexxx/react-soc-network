import React from "react";
import {Formik, FormikHelpers , Form, Field} from "formik";
import { FilterType } from "../../redux/users-reducer";

const validateForm = (values: any) => {
    const errors = {};

    return errors;
}
type Props  = {
    onFilterChange: (filter: FilterType) => void
}

// type testProps = {
//     setSubmitting: (isSubmitting: boolean) => void
// }

export const UsersSearchForm: React.FC<Props> = ({onFilterChange}) => {
    const submit = (values: FilterType, { setSubmitting }: FormikHelpers<FilterType>) => {
        setTimeout(() => {
            console.log(values)
            onFilterChange(values);
            setSubmitting(false);
        }, 400);
    }
    return (
        <div>
            <Formik initialValues={{ term: '', friend: null as null | boolean }}
                    validate={validateForm}
                    onSubmit={submit}
            >
                {({isSubmitting}) => {
                    return (
                        <Form >
                            <Field type="text" name="term"/>
                            <Field name="friend" as="select">
                                <option value="null">All</option>
                                <option value="true">Followed</option>
                                <option value="false">Unfollowed</option>
                            </Field>
                            <button type="submit" disabled={isSubmitting}>
                                Найти
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

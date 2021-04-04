import React from "react";
import {Formik, Form, Field} from "formik";
import { FilterType } from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getFilteredResult} from "../../redux/user-selectors";

const validateForm = (values: any) => {
    const errors = {};

    return errors;
}
type Props  = {
    onFilterChange: (filter: FilterType) => void
}

type FriendFormType = 'true' | 'false' | 'null';

type FormType = {
    term: string,
    friend: FriendFormType
}

export const UsersSearchForm: React.FC<Props> = ({onFilterChange}) => {

    const filter = useSelector(getFilteredResult);

    const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
            const filter: FilterType  = {
                term: values.term,
                friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
            }

            onFilterChange(filter);
            setSubmitting(false);
    }
    return (
        <div>
            <Formik enableReinitialize
                    initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
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

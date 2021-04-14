import React from "react";
import { FilterType } from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getFilteredResult} from "../../redux/user-selectors";
import { Form, Select, Input, Button} from "antd";
import {Formik, Field as FormikField, Form as FormikForm } from "formik";
import { DownCircleTwoTone } from '@ant-design/icons'
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

const FormItem = Form.Item;
const Option = Select.Option;

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
                {
                    ({isSubmitting, values, setFieldValue, setFieldTouched }) => {
                    return (
                        <FormikForm>
                            <FormItem>
                                <FormikField
                                    name="term"
                                    render={({ field } : any) => <Input {...field} placeholder="term" style={{ width: 200 }} />}
                                />
                            </FormItem>

                            <FormItem>
                                <FormikField
                                    name="friend"
                                    as="select"
                                    render={({ field }: any) => (
                                        <Select
                                            suffixIcon={<DownCircleTwoTone />}
                                            style={{ width: 200 }}
                                            {...field}
                                            onChange={value => setFieldValue("friend", value)}
                                            onBlur={() => setFieldTouched("friend", true)}
                                            value={values.friend}
                                        >
                                            <Option key={1} value="null">All</Option>
                                            <Option key={2} value="true">Followed</Option>
                                            <Option key={3} value="false">Unfollowed</Option>
                                        </Select>
                                    )}
                                />
                            </FormItem>

                            <FormItem>
                                <Button htmlType="submit" type="primary" disabled={isSubmitting}>
                                    Найти
                                </Button>
                            </FormItem>
                        </FormikForm>
                    )
                }
                }
            </Formik>
        </div>
    )
}

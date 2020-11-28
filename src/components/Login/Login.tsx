import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import {connect} from "react-redux";
import {withAuthRedirect2} from "../hoc/withAuthRedirect";
import {required} from "../../utils/Form-validator";
import { Input } from '../common/FormControls/FormControls';

function LoginForm (props: any) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name="email"
                    placeholder='Введите логин'
                    component={Input} type="text"
                    validate = {[required]}
                />
            </div>
            <div>
                <Field name="password"
                       placeholder='Введите пароль'
                       component={Input}
                       type="password"
                       validate = {[required]}
                />
            </div>
            <div>
                <Field name="rememberMe" component="input" type="checkbox"/> rememberMe

            </div>
            <div>
                <button> Войти</button>
            </div>
        </form>
    )
}

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

function Login({login}: any) {
    const loginSubmit = (values :any) => {
        const {email, password, rememberMe } = values;

        login(email, password, rememberMe);

    }
    return (
        <>
            <h1>Login</h1>
          <LoginReduxForm onSubmit={loginSubmit} />
        </>
    );
}



export default connect(null, {login})(withAuthRedirect2(Login));
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import {connect} from "react-redux";

function LoginForm (props: any) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="email" placeholder='Введите логин' component="input" type="text"/>
            </div>
            <div>
                <Field name="password" placeholder='Введите пароль' component="input" type="password"/>
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
    const handleSubmit = (values :any) => {
        const {email, password, rememberMe } = values;

        login(email, password, rememberMe)

    }
    return (
        <>
            <h1>Login</h1>
          <LoginReduxForm onSubmit={handleSubmit} />
        </>
    );
}

let mapStateToProps = (state: any) => {

}

export default connect(mapStateToProps, {login} )(Login);
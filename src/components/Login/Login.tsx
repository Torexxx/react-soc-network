import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {login} from '../../redux/auth-reducer';
import {connect} from "react-redux";
import {required} from "../../utils/Form-validator";
import {Input} from '../common/FormControls/FormControls';
import {Redirect} from "react-router-dom";
import s from './Login.module.css';

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
            {
                props.error ? <div className={s.commonErrorText}>{props.error}</div>
                    : ''
            }
            <div>
                <button> Войти</button>
            </div>

            {
                props.captchaImg ? <div> <img alt='' src={props.captchaImg}/>
                    <div>
                        <Field
                            name="captcha"
                            placeholder="captcha"
                            component={Input}
                            type="text"
                            valid = {[required]}
                        />
                    </div>
                </div>
                    : ''
            }

        </form>
    )
}

function Login({login, isAuth}: any) {

    const loginSubmit = (values :any) => {
        const {email, password, rememberMe, captcha } = values;
        login(email, password, rememberMe, captcha);
    }

    if (isAuth) return <Redirect to='/profile'/>
    return (
        <>
            <h1>Login</h1>
          <LoginReduxForm onSubmit={loginSubmit} />

        </>
    );

}
const mapStateToProps = (state: any) => ({isAuth: state.auth.isAuth, captchaImg: state.auth.captchaImg});

let LoginReduxForm = reduxForm({form: 'login'})(connect(mapStateToProps, null)(LoginForm));

export default connect(mapStateToProps, {login})(Login);
import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {login} from '../../redux/auth-reducer';
import {connect} from "react-redux";
import {required} from "../../utils/Form-validator";
import {fieldCreator, Input} from '../common/FormControls/FormControls';
import {Redirect} from "react-router-dom";
import s from './Login.module.css';
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps  = {
    captchaUrl: string | null
};
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
};
type LoginFormValuesKeysType = Extract<keyof LoginFormValuesType, string>;

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {fieldCreator<LoginFormValuesKeysType>("email", Input,{},[required],'Введите логин')}
            {fieldCreator<LoginFormValuesKeysType>("password", Input,{type: "password"},[required],'Введите пароль')}
            {fieldCreator<LoginFormValuesKeysType>('rememberMe', Input,{type: "checkbox"},[],undefined, 'Remember me')}
            {error ? <div className={s.commonErrorText}>{error}</div> : ''}
            <div>
                <button> Войти</button>
            </div>

            {captchaUrl ? <div> <img alt='' src={captchaUrl}/>
                    <div>
                        {fieldCreator<LoginFormValuesKeysType>('captcha', Input,{},[required],'captcha', 'Remember me')}
                    </div>
                </div>
                    : ''
            }

        </form>
    )
};

type MapStateProps = {
    isAuth: boolean
    captchaUrl: string | null
};
type MapDispatchProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};

const Login: React.FC<MapStateProps & MapDispatchProps> = ({login, isAuth, captchaUrl}) => {

    const loginSubmit = (formData: LoginFormValuesType) => {
        const {email, password, rememberMe, captcha } = formData;
        login(email, password, rememberMe, captcha);
    }

    if (isAuth) return <Redirect to='/profile'/>
    return (
        <>
            <h1>Login</h1>
          <LoginReduxForm onSubmit={loginSubmit} captchaUrl ={captchaUrl}/>
        </>
    );
};

let LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

const mapStateToProps = (state: AppStateType): MapStateProps => ({isAuth: state.auth.isAuth, captchaUrl: state.auth.captchaUrl});
export default connect(mapStateToProps, {login})(Login);
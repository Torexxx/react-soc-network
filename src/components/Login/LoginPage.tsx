import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {login} from '../../redux/auth-reducer';
import {useDispatch, useSelector} from "react-redux";
import {required} from "../../utils/Form-validator";
import {fieldCreator, Input} from '../common/FormControls/FormControls';
import {Redirect} from "react-router-dom";
import s from './Login.module.css';

type LoginFormOwnProps  = {
    captchaUrl: string | null
};
type LoginFormValues = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
};
type LoginFormValuesKeys = Extract<keyof LoginFormValues, string>;

const LoginForm: React.FC<InjectedFormProps<LoginFormValues, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {fieldCreator<LoginFormValuesKeys>("email", Input,{},[required],'Введите логин')}
            {fieldCreator<LoginFormValuesKeys>("password", Input,{type: "password"},[required],'Введите пароль')}
            {fieldCreator<LoginFormValuesKeys>('rememberMe', Input,{type: "checkbox"},[],undefined, 'Remember me')}
            {error ? <div className={s.commonErrorText}>{error}</div> : ''}
            <div>
                <button> Войти</button>
            </div>

            {captchaUrl ? <div> <img alt='' src={captchaUrl}/>
                    <div>
                        {fieldCreator<LoginFormValuesKeys>('captcha', Input,{},[required],'captcha', 'Remember me')}
                    </div>
                </div>
                    : ''
            }

        </form>
    )
};

// type MapStateProps = {
//     isAuth: boolean
//     captchaUrl: string | null
// };
// type MapDispatchProps = {
//     login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
// };

export const LoginPage: React.FC = () => {

    const isAuth = useSelector<any, any>(state => state.auth.isAuth);
    const captchaUrl = useSelector<any, any>(state => state.auth.captchaUrl);
    const dispatch = useDispatch();

    const loginSubmit = (formData: LoginFormValues) => {
        const {email, password, rememberMe, captcha } = formData;
        dispatch(login(email, password, rememberMe, captcha));
    }

    if (isAuth) return <Redirect to='/profile'/>
    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={loginSubmit} captchaUrl ={captchaUrl}/>
        </>
    );
}

// const Login: React.FC<MapStateProps & MapDispatchProps> = ({login, isAuth, captchaUrl}) => {
//
//     const loginSubmit = (formData: LoginFormValues) => {
//         const {email, password, rememberMe, captcha } = formData;
//         login(email, password, rememberMe, captcha);
//     }
//
//     if (isAuth) return <Redirect to='/profile'/>
//     return (
//         <>
//             <h1>Login</h1>
//           <LoginReduxForm onSubmit={loginSubmit} captchaUrl ={captchaUrl}/>
//         </>
//     );
// };

let LoginReduxForm = reduxForm<LoginFormValues, LoginFormOwnProps>({form: 'login'})(LoginForm);

// const mapStateToProps = (state: AppStateType): MapStateProps => ({
//     isAuth: state.auth.isAuth,
//     captchaUrl: state.auth.captchaUrl
// });
// export default connect(mapStateToProps, {login})(Login);
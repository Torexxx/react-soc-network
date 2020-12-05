import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = ({...props}) => {

    const logOutHandler = () => {
        props.logout();
    }

    return <header className={s.header}>

        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt='' />

        <div className={s.loginBlock}>
        { props.userAuthData.isAuth
            ? <NavLink to={'/login'} onClick={logOutHandler} className={s.login} >Logout </NavLink>
            : <NavLink to={'/login'} className={s.login}>Login</NavLink>
        }
        </div>
    </header>
}

export default Header;
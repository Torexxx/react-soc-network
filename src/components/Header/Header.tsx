import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import defaultAvatar from '../../assets/images/avatar.png'

const Header = ({...props}) => {

    const logOutHandler = () => {
        props.logOut();
    }

    return <header className={s.header}>

        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt='' />


        {
            props.userAuthData.isAuth ?
                <div className={s.loginBlock}>
                    <div className={s.loginAva}>
                        <div className={s.authUser}>{props.userAuthData.login}</div>
                        { props.userAuthData.userAvatar ?  <img  src={props.userAuthData.userAvatar} alt=''/> : <img alt='' src={defaultAvatar} />}
                    </div>
                    <NavLink to={'/login'} onClick={logOutHandler} className={s.login} >Sign out </NavLink>
                </div>

                : <NavLink to={'/login'} className={s.login}>Log in</NavLink>
        }

    </header>
}

export default Header;
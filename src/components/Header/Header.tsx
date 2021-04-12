import React from 'react';
import s from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import {UserOutlined} from '@ant-design/icons';
import {Avatar, Col, Layout, Menu, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";

// export type UserAuthData = {
//     userId:  number | null
//     login:  string | null
//     email:  string | null
//     isAuth: boolean,
//     userAvatar: string | null
//     captchaUrl: string | null
// }

// export type MapProps = {
//     userAuthData: UserAuthData
// }
// export type DispatchProps = {
//     logout: () => void
// }

export const Header: React.FC = () => {

    const userAuthData = useSelector((state : AppStateType) => state.auth);
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
    }

    const {Header} = Layout;

    const logOutHandler = () => {
        logoutUser();
    }

    return <Header className="header">
        <div className="logo"/>
        <Row>
            <Col span={20}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item>
                </Menu>
            </Col>
            <Col span={4}>
                {userAuthData.isAuth
                    ? <NavLink to={'/login'} onClick={logOutHandler} className={s.login}>Logout </NavLink>
                    : <NavLink to={'/login'} className={s.login}>Login</NavLink>
                }
                <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/> {userAuthData.login}
            </Col>
        </Row>
    </Header>
}

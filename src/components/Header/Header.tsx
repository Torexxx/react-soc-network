import React from 'react';
import s from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import {UserOutlined} from '@ant-design/icons';
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {getIsAuth, getLogin} from '../../redux/auth-selectors';


export const Header: React.FC = () => {

    const isAuth = useSelector(getIsAuth);
    const login = useSelector(getLogin);
    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout());
    }

    const {Header} = Layout;

    return <Header className="header">
        <div className="logo"/>
        <Row>
            <Col span={20}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item>
                </Menu>
            </Col>
            <Col span={4}>
                {isAuth
                    ? <div className={s.userMenu}> <Button type={"primary"} onClick={logoutCallback} className={s.login}>Logout</Button>
                         <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                         <span className={s.login}>{login}</span>
                      </div>
                    : <Button type={'primary'} className={s.login}>Login</Button>
                }

            </Col>
        </Row>
    </Header>
}

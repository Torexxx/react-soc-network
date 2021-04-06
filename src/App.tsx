import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersPage from "./components/Users/UsersPage";
// import MainAppHoc from "./hooks/mainAppHoc";
// import MainAppChildren from "./hooks/mainAppChildren";
import MainAppRenderProps from "./hooks/mainAppRenderProps";
import {LoginPage} from './components/Login/LoginPage';
import {Preloader} from "./components/common/Preloader/Preloader";
import {connect, Provider} from 'react-redux';
import {initializeApp} from "./redux/app-reducer";
import { compose } from 'redux';
import store, {AppStateType} from './redux/redux-store';
import withSuspense from "./hoc/withSuspense";
import Button from 'antd/lib/button';
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfilePage = React.lazy(() => import("./components/Profile/ProfilePage"));


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

type MapDispatchProps = { initializeApp: () => void };
type MapStateProps = ReturnType<typeof mapStateToProps>;

const SuspendedDialogs  = withSuspense(DialogsContainer);
const SuspendedProfile  = withSuspense(ProfilePage);

class App extends React.Component<MapStateProps & MapDispatchProps> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        if (e.reason.response) {
            alert(e.reason.response.data.message + ' Необходимо залогиниться на сайте')
        }
        // TODO dispatch(globalError) Выпадашка
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (this.props.initialized) {
            return (
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 150px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                >
                                    <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                        <Menu.Item key="1">option1</Menu.Item>
                                        <Menu.Item key="2">option2</Menu.Item>
                                        <Menu.Item key="3">option3</Menu.Item>
                                        <Menu.Item key="4">option4</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                        <Menu.Item key="5">option5</Menu.Item>
                                        <Menu.Item key="6">option6</Menu.Item>
                                        <Menu.Item key="7">option7</Menu.Item>
                                        <Menu.Item key="8">option8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                        <Menu.Item key="9">option9</Menu.Item>
                                        <Menu.Item key="10">option10</Menu.Item>
                                        <Menu.Item key="11">option11</Menu.Item>
                                        <Menu.Item key="12">option12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Switch>
                                    <Route path='/' exact render={() => <Redirect to='/profile'/>}/>
                                    <Route path='/dialogs' render={() => <SuspendedDialogs /> }/>
                                    <Route path='/profile/:userId?' render={() => <SuspendedProfile />}/>
                                    <Route path='/users' render={ () => <UsersPage titleText = {"Пользователи"}/> }/>
                                    <Route path='/hooks' render={ () => <MainAppRenderProps /> }/>
                                    <Route path='/login' render={ () => <LoginPage /> }/>
                                    <Route path='*' render={ () => <div>404 NOT FOUND</div> }/>
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>

            )
        } else {
            return <Preloader />
        }
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }
}
let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps,{initializeApp}))
(App)

const MainApp: React.FC = () => {
   return <Router>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </Router>
}

export default MainApp;

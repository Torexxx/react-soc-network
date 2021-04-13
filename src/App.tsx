import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Breadcrumb, Layout, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {BrowserRouter as Router, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {Header} from './components/Header/Header';
import UsersPage from "./components/Users/UsersPage";
// import MainAppHoc from "./hooks/mainAppHoc";
// import MainAppChildren from "./hooks/mainAppChildren";
import MainAppRenderProps from "./hooks/mainAppRenderProps";
import {LoginPage} from './components/Login/LoginPage';
import {Preloader} from "./components/common/Preloader/Preloader";
import {connect, Provider} from 'react-redux';
import {initializeApp} from "./redux/app-reducer";
import {compose} from 'redux';
import store, {AppStateType} from './redux/redux-store';
import withSuspense from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfilePage = React.lazy(() => import("./components/Profile/ProfilePage"));


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

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
                    <Header />
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
                                    <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                                        <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                                        <Menu.Item key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<UserOutlined />} title="Developers">
                                        <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Switch>
                                    <Route path='/' exact render={() => <Redirect to='/profile'/>}/>
                                    <Route path='/dialogs' render={() => <SuspendedDialogs /> }/>
                                    <Route path='/profile/:userId?' render={() => <SuspendedProfile />}/>
                                    <Route path='/developers' render={ () => <UsersPage titleText = {"Developers"}/> }/>
                                    <Route path='/hooks' render={ () => <MainAppRenderProps /> }/>
                                    <Route path='/login' render={ () => <LoginPage /> }/>
                                    <Route path='*' render={ () => <div>404 NOT FOUND</div> }/>
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Social Network ©2021</Footer>
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

import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from "./components/Users/UsersContainer";
// import MainAppHoc from "./hooks/mainAppHoc";
// import MainAppChildren from "./hooks/mainAppChildren";
import MainAppRenderProps from "./hooks/mainAppRenderProps";
import LoginPage from './components/Login/Login';
import {Preloader} from "./components/common/Preloader/Preloader";
import {connect, Provider} from 'react-redux';
import {initializeApp} from "./redux/app-reducer";
import { compose } from 'redux';
import store, {AppStateType} from './redux/redux-store';
import withSuspense from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

type MapDispatchProps = { initializeApp: () => void };
type MapStateProps = ReturnType<typeof mapStateToProps>;

const SuspendedDialogs  = withSuspense(DialogsContainer);
const SuspendedProfile  = withSuspense(ProfileContainer);

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
                <div className='app-wrapper'>
                    <HeaderContainer />
                    <Navbar />
                    <div className='app-wrapper-content'>
                        <Switch>
                            <Route path='/' exact render={() => <Redirect to='/profile'/>}/>
                            <Route path='/dialogs' render={() => <SuspendedDialogs /> }/>
                            <Route path='/profile/:userId?' render={() => <SuspendedProfile />}/>
                            <Route path='/users' render={ () => <UsersContainer titleText = {"Пользователи"}/> }/>
                            <Route path='/hooks' render={ () => <MainAppRenderProps /> }/>
                            <Route path='/login' render={ () => <LoginPage /> }/>
                            <Route path='*' render={ () => <div>404 NOT FOUND</div> }/>
                        </Switch>
                    </div>
                </div>
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
            <h1>&#9749;</h1>
            <AppContainer />
        </Provider>
    </Router>
}


export default MainApp;

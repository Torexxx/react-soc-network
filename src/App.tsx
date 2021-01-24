import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
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
import store from './redux/redux-store';
import withSuspense from "./components/hoc/withSuspense";
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

class App extends React.Component<any> {

    catchAllUnhandledErrors = () => {
        alert('some error occured')
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
                            <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                            <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                            <Route path='/profile/:userId?' render={ withSuspense(ProfileContainer)}/>
                            <Route path='/users' render={ () => <UsersContainer /> }/>
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

const mapStateToProps = (state: any) => {
    return {
        initialized: state.app.initialized
    }
}
let AppContainer = compose(
    connect(mapStateToProps,{initializeApp}) (App))

const MainApp = (props: any) => {
   return <Router>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </Router>
}


export default MainApp;

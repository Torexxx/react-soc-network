import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
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

export type WrapperProps = {
    mainApp: React.ElementType
    initialized: boolean
}

class App extends React.Component<any> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (this.props.initialized) {
            return (
                <div className='app-wrapper'>
                    <HeaderContainer />
                    <Navbar />
                    <div className='app-wrapper-content'>
                        <Route path='/' exact> Заглушка</Route>
                        <Route path='/dialogs' render={ () => <DialogsContainer /> }/>
                        <Route path='/profile/:userId?' render={ () => <ProfileContainer /> }/>
                        <Route path='/users' render={ () => <UsersContainer /> }/>
                        <Route path='/hooks' render={ () => <MainAppRenderProps /> }/>
                        <Route path='/login' render={ () => <LoginPage /> }/>
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

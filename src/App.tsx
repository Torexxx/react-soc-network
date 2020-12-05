import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
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
import { connect } from 'react-redux';
import {getAuthUserData} from "./redux/auth-reducer";
import {initializeApp} from "./redux/app-reducer";
import { compose } from 'redux';

// type AppProps = {
//     store2: Store<CombinedState<IState>>
// }

// type AppProps = {
//     dialogsPage: {
//         dialogs: Array<IDialog>
//         messages: Array<IMessage>
//         newMessageText: string,
//     }
//     profilePage: {
//         posts: Array<IPost>,
//         newPostText: string
//         // posts: Array<{ id: number, message: string, likesCount: number }>
//         // posts: { id: number, message: string, likesCount: number }[]
//     }
//     dispatch(action: { type: string, payload?:{newText?: string, dialogText?: string  } }): void
//
// }

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

export default
    compose(
        connect(mapStateToProps,{initializeApp})
        (App)
    )

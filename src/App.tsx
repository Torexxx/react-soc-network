import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
// import MainAppHoc from "./hooks/mainAppHoc";
// import MainAppChildren from "./hooks/mainAppChildren";
import MainAppRenderProps from "./hooks/mainAppRenderProps";

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

const App: React.FunctionComponent = () => {

    return (
            <div className='app-wrapper'>
                <Header />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/' exact> Заглушка</Route>
                    <Route path='/dialogs' render={ () => <DialogsContainer /> }/>
                    <Route path='/profile/:userId?' render={ () => <ProfileContainer /> }/>
                    <Route path='/users' render={ () => <UsersContainer /> }/>
                    <Route path='/hooks' render={ () => <MainAppRenderProps /> }/>
                </div>
            </div>
    )
}

export default App;

import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

// type AppProps = {
//     store: Store<CombinedState<IState>>
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
                    <Route path='/profile' render={ () => <Profile /> }/>
                    <Route path='/users' render={ () => <UsersContainer /> }/>
                </div>
            </div>
    )
}

export default App;

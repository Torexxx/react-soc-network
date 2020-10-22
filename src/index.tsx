import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import store from './redux/redux-store';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
// import { StateType } from "./types";
// import StoreContext from "./StoreContext";
import { Provider } from "react-redux"


    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <Provider store={ store }>
                    <App/>
                </Provider>
            </Router>
        </React.StrictMode>,
        document.getElementById('root')
    );




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

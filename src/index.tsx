import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import store from './redux/redux-store';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"

    // setInterval(() => {
    //     store.dispatch({type: "FAKE"})
    // },5000)
    ReactDOM.render(
            <Router>
                <Provider store={store}>
                    <App/>
                </Provider>
            </Router>
      ,
        document.getElementById('root')
    );




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

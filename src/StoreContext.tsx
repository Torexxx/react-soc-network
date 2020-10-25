import React from "react";
import store from "./redux/redux-store";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";

const StoreContext = React.createContext(store);

export const Provider = (props: any) => {
    return  <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
}

export default StoreContext
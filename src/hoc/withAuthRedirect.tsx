import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";

const mapStateToPropsWithRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapPropsType = {
    isAuth: boolean
};
type DispatchPropType = {

};

export const withAuthRedirect = <WCP, >(WrappedComponent: React.ComponentType<WCP>) => {

    const RedirectComponent: React.FC<DispatchPropType & MapPropsType> = (props) => {

        let {isAuth, ...restProps} = props;

        if (!isAuth) return <Redirect to='/login'/>
        return (
            <WrappedComponent {...restProps as WCP }   />
        );
    }

    return connect<MapPropsType, DispatchPropType, WCP, AppStateType>(
        mapStateToPropsWithRedirect, {})
    (RedirectComponent);
}

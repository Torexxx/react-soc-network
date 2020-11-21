import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToPropsWithRedirect = (state: any) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component: any) => {

    class RedirectComponent extends React.Component<any, any> {
        render() {
            console.log(this.props)
            if (!this.props.isAuth) return <Redirect to='/login'/>
            return (
                <Component {...this.props} />
            );
        }
    }

    return connect(mapStateToPropsWithRedirect)(RedirectComponent);
}
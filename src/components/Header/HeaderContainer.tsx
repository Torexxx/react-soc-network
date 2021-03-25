import React from 'react';
import { connect } from 'react-redux';
import Header, {DispatchProps, MapProps } from './Header';
import { logout} from "../../redux/auth-reducer";
import { AppStateType } from '../../redux/redux-store';

export type UserAuthData = {
    userId:  number | null
    login:  string | null
    email:  string | null
    isAuth: boolean,
    userAvatar: string | null
    captchaUrl: string | null
}

class HeaderContainer extends React.Component<MapProps & DispatchProps> {
    render () {
        return <Header {...this.props} logout = {this.props.logout} />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        userAuthData: state.auth
    }
}

export default connect<MapProps, DispatchProps, {}, AppStateType>(
    mapStateToProps, {logout})
(HeaderContainer);

import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout} from "../../redux/auth-reducer";
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    userAuthData: {
        userId:  number | null
        login:  string | null
        email:  string | null
        isAuth: boolean,
        userAvatar: string | null
        captchaUrl: string | null
    }
}
type MapDispatchPropsType = {
    logout: () => void
}
export type PropsType = MapStatePropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component<PropsType> {

    render () {
        return <Header {...this.props} logout = {this.props.logout} />
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userAuthData: state.auth
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType >(mapStateToProps, {logout})(HeaderContainer);

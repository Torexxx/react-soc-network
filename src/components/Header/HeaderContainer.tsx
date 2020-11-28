import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {getAuthUserData, logOut} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<any> {

    componentDidMount() {
        this.props.getAuthUserData();
    }

    render () {
        return <Header {...this.props} loginOut = {this.props.logOut} />
    }
}

let mapStateToProps = (state: any) => {
    return {
        userAuthData: state.auth
    }
}

export default connect(mapStateToProps, { getAuthUserData, logOut })(HeaderContainer);

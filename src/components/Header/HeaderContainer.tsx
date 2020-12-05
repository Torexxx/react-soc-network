import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<any> {

    componentDidMount() {

        // this.props.getAuthUserData();
    }

    render () {
        return <Header {...this.props} logout = {this.props.logout} />
    }
}

let mapStateToProps = (state: any) => {
    return {
        userAuthData: state.auth
    }
}

export default connect(mapStateToProps, {  logout })(HeaderContainer);

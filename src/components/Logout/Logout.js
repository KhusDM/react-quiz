import {Component} from "react";
import {connect} from "react-redux";
import {logout} from "../../store/actions/authActionCreator";
import {Navigate} from "react-router-dom";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (<Navigate replace to="/"/>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    };
}

export default connect(null, mapDispatchToProps)(Logout)
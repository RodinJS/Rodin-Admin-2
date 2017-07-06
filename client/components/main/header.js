/**
 * Created by Reinchard on 6/29/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logOut} from "../../actions/login";
import {isEmpty, isEqual} from "lodash";
import {SideBar} from "./SideBar";

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentWillUpdate(nextProps) {
        console.log(nextProps)
    }

    logout() {
        this.props.actions.logOut()
            .then(() => {
                localStorage.removeItem('token');
                this.context.router.history.push('/')
            })
            .catch((e) => console.log(e))
    }

    render() {
        let signOut;
        if (this.props.isAuth) {
            signOut = (<SideBar logout={this.logout}/>)
        }
        return <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse"
                        data-target=".navbar-ex1-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link to={'/'} className="navbar-brand">Rodin</Link>
            </div>
            {signOut}
        </nav>
    }
}

Header.propTypes = {
    actions: PropTypes.object.isRequired,
};
Header.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps(state) {
    return {
        isAuth: !isEmpty(state.authReducer.payload.token)
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({logOut}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
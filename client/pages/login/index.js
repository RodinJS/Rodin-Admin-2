/**
 * Created by xgharibyan on 6/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {login} from "../../actions/login";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
        this.setCookie = this.setCookie.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.login = this.login.bind(this);

    }

    setCookie(name, value, days = 7, path = '/') {
        const expires = new Date(Date.now() + days * 864e5).toGMTString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
    }

    onHandleChange(e) {
        let fieldName = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({[fieldName]: value});
    }

    login(e) {
        e.preventDefault();
        this.props.actions.login({username: this.state.username, password: this.state.password})
            .then(response => {
                this.setCookie('token', response.payload.token);
                localStorage.setItem('token', JSON.stringify(response.payload.token));
                this.props.history.push('/dashboard')
            })
            .catch(() => {
                this.props.notify('error', {message: 'Wrong username or password'});
            })
    }

    render() {
        return (
            <div className="col-md-3 col-md-offset-4">
                <div className="card card-container">
                    <form className="form-signin" onSubmit={this.login}>
                        <span id="reauth-email" className="reauth-email"/>
                        <input type="text"
                               id="inputEmail"
                               className="form-control"
                               name="username"
                               value={this.state.username}
                               onChange={this.onHandleChange}
                               placeholder="Username"
                               required autoFocus/>
                        <input type="password"
                               id="inputPassword"
                               className="form-control"
                               name="password"
                               value={this.state.password}
                               placeholder="Password"
                               onChange={this.onHandleChange}
                               required/>
                        <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    actions: PropTypes.object.isRequired
};
Login.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({login}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
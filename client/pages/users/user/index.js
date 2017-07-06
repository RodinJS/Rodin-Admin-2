/**
 * Created by Reinchard on 6/26/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUser, updateUser} from "../../../actions/users";
import EditUser from "../../../components/user/editUser";
import {isEqual} from "lodash";
import {notify} from "../../../actions/notification";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param: props.match.params.username
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.actions.getUser(this.state.param);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.user, this.state.user)) {
            this.setState({user: nextProps.user});
        }
    }

    handleChange(e) {
        let fieldName = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const user = Object.assign({}, this.state.user, {[fieldName]: value});
        this.setState(Object.assign({}, this.state, {user}));
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.actions.updateUser(this.state.param, this.state.user)
            .then((res) => this.props.actions.notify('success', {message: "User Updated"}))
            .catch((err) => this.props.actions.notify('error', {message: err.response.data.error.message}))
    }

    render() {
        let editUser;
        if (this.state.user) {
            editUser = <EditUser user={this.state.user} onSubmit={this.onSubmit.bind(this)} onChange={this.handleChange}/>;
        }
        return (<div>
            {editUser}
        </div>)
    }
}

User.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
};
User.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getUser, updateUser,notify}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(User);
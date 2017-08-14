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
import ConfirmModal from '../../../components/main/confirmModals';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param: props.match.params.username,
            updated: null,
            showModal: false,
            modalOptions: {
                title: 'Update User',
                body: `Are you sure?`,
                type: 'success',
                buttonText: 'Update',
                onSubmit: this.onUpdate.bind(this),
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.onStateReset = this.onStateReset.bind(this);
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
        this.setState({
            user,
            updated: Object.assign({}, this.state.updated, {[fieldName]: value})
        });
    }

    onUpdate(e) {
        e.preventDefault();
        this.props.actions.updateUser(this.state.param, this.state.updated)
            .then(() => {
                this.props.actions.notify('success', {message: "User Updated"});
                this.setState({showModal: false});
            })
            .catch((err) => this.props.actions.notify('error', {message: err.response.data.error.message}))
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({showModal: true, modalOptions: {
            title: 'Update User',
            body: `Are you sure?`,
            type: 'success',
            buttonText: 'Update',
            onSubmit: this.onUpdate.bind(this),
        }});
    }

    onStateReset(e) {
        e.preventDefault();
        this.setState({
            showModal: true, modalOptions: {
                title: 'Reset changes',
                body: `Are you sure?`,
                type: 'warning',
                buttonText: 'Reset',
                onSubmit: this.onReset.bind(this),
            }
        });
    }

    onReset() {
        this.setState({updated: null, user: this.props.user, showModal: false});
        this.props.actions.notify('success', {message: 'Changes was resetting'})
    }

    render() {
        let editUser;
        if (this.state.user) {
            editUser =
                <EditUser user={this.state.user} onSubmit={this.onSubmit.bind(this)} onChange={this.handleChange}
                          onReset={this.onStateReset}/>;
        }
        return (<div>
            <ConfirmModal show={this.state.showModal} onClose={() => this.setState({showModal: false})}
                          options={this.state.modalOptions}/>
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
    return {actions: bindActionCreators({getUser, updateUser, notify}, dispatch)}

}

export default connect(mapStateToProps, mapDispatchToProps)(User);
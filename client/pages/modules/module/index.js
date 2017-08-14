/**
 * Created by xgharibyan on 6/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from '../../../utils/axiosWrapper/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ModuleElement} from '../../../components/module/index';
import {getModule} from "../../../actions/modules";
import {notify} from "../../../actions/notification";
import {isEqual} from "lodash";
import ConfirmModal from '../../../components/main/confirmModals';

class Module extends Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            moduleId: props.match.params.id,
            headerKeys: ['title', 'author', 'submitedDate', 'approvedDate', 'rejectedDate', 'createdAt', 'status'],
            module: {
                title: '',
                description: '',
                author: '',
                url: '',
                status: 'Pending',
                exampleLink: '',
                documentationLink: '',
                email: ''
            },
            modalOptions: {
                title: '',
                body: '',
                type: 'success',
                buttonText: '',
                onSubmit: null,
            },
            rejectReason: '',
            type: 'create'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClose = this.onClose.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.onReject = this.onReject.bind(this);
        this.onApprove = this.onApprove.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onDelete() {

    }

    openDialog(type='danger', title='Title', action='onSubmit', body='Description', buttonText='Ok') {
        this.setState({
            showModal: true,
            modalOptions: {
                title: title,
                body: body,
                type: type,
                buttonText: buttonText,
                onSubmit: this[action]
            }
        })
    }

    handleChange(e) {
        let fieldName = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const module = Object.assign({}, this.state.module, {[fieldName]: value});
        this.setState(Object.assign({}, this.state, {module}, {updated: {[fieldName]: value}}));
    }

    handleRequestClose(param) {
        if (this.props.callbackParent)
            return this.props.callbackParent()
    }

    onReset() {
        this.setState({updated:null, module: this.props.module, showModal: false});
        this.props.actions.notify('success', {message: 'Changes was resetting'});
    }

    onSave() {
        axios.post('/api/modules/', this.state.module)
            .then(response => this.handleRequestClose())
            .catch(err => {
                console.log('err', err);
            })
    }

    onUpdate() {
        axios.put('/api/modules/', this.state.updated)
            .then(response => this.handleRequestClose())
            .catch(err => {
                console.log('err', err);
            })
    }

    onAction(e) {
        e.preventDefault();
        this.openDialog('success', this.state.moduleId === 'create' ? 'Create module': 'Update module', this.state.moduleId === 'create' ? 'onSave': 'onUpdate','Are you sure ?', 'Save')

    }

    onApprove() {
        axios.post('/api/module/modules/status/Active', {moduleId: this.state.module._id})
            .then(response => {
                this.props.actions.notify('success', {message: 'Module Approved'})
            })
            .catch(err => {
                this.props.actions.notify('error', {message: 'Whoops matrix overloaded'})
            })
    }

    onReject() {
        axios.post('/api/module/modules/status/Rejected', {moduleId: this.state.module._id, reason:this.state.rejectReason})
            .then(response => {
                this.onClose();
                this.props.actions.notify('success', {message: 'Module rejected'})
            })
            .catch(err => {
                this.onClose();
                this.props.actions.notify('error', {message: 'Whoops matrix overloaded'})
            })
    }

    handleRequestClose() {
        this.setState({open: false});
    }

    componentDidMount() {
        if (this.state.moduleId !== 'create') {
            this.props.actions.getModule(this.state.moduleId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.user, this.state.module)) {
            this.setState({module: nextProps.module});
        }
    }

    onClose() {
        this.setState({showModal: false});
    }

    render() {
        let module;
        if (this.state.moduleId === 'create' || this.state.module) {
            module = <ModuleElement module={this.state.module} onChange={this.handleChange}
                                    onSubmit={this.onAction.bind(this)}
                                    onAction={this.openDialog}/>;
        }

        return (<div>
            <ConfirmModal show={this.state.showModal} onClose={this.onClose}
                          options={this.state.modalOptions}/>
            {module}
        </div>);
    }
}

Module.propTypes = {
    actions: PropTypes.object.isRequired
};
Module.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps(state) {
    return {
        module: state.moduleReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getModule, notify}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Module)
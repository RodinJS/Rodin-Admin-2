/**
 * Created by Reinchard on 7/14/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {isEqual} from "lodash";
import {notify} from "../../../actions/notification";
import {getProject, updateProject} from "../../../actions/projects";
import EditProject from "../../../components/project/EditProject";
import ConfirmModal from "../../../components/main/confirmModals";

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param: props.match.params.projectId,
            showModal: false,
            modalOptions: {
                title: 'Update Project',
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
        this.props.actions.getProject(this.state.param);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.project, this.state.project)) {
            this.setState({project: nextProps.project});
        }
    }

    handleChange(e) {
        let fieldName = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const project = Object.assign({}, this.state.project, {[fieldName]: value});
        this.setState(Object.assign({}, this.state, {project}, {updated: {[fieldName]: value}}));
    }

    onUpdate() {
        this.props.actions.updateProject(this.state.param, this.state.updated)
            .then(() => {
                this.props.actions.notify('success', {message: "User Updated"});
                this.setState({showModal: false});
            })
            .catch((err) => this.props.actions.notify('error', {message: err.response.data.error.message}))
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
        this.setState({updated: null, project: this.props.project, showModal: false});
        this.props.actions.notify('success', {message: 'Changes was resetting'})
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({showModal: true,  modalOptions: {
            title: 'Update Project',
            body: `Are you sure?`,
            type: 'success',
            buttonText: 'Update',
            onSubmit: this.onUpdate.bind(this),
        }});
    }

    render() {
        let editProject;
        if (this.state.project) {
            editProject = <EditProject project={this.state.project} onSubmit={this.onSubmit.bind(this)} onChange={this.handleChange} onReset={this.onStateReset}/>;
        }
        return (<div>
            <ConfirmModal show={this.state.showModal} onClose={() => this.setState({showModal: false})} options={this.state.modalOptions} />
            {editProject}
        </div>)
    }
}

Project.propTypes = {
    actions: PropTypes.object.isRequired,
    project: PropTypes.object
};
Project.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};

function mapStateToProps(state) {
    return {
        project: state.projectReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getProject, updateProject, notify}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Project);
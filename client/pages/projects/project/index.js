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

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param: props.match.params.projectId
        };
        this.handleChange = this.handleChange.bind(this);
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

    onSubmit(e) {
        e.preventDefault();
        this.props.actions.updateProject(this.state.param, this.state.updated)
            .then((res) => this.props.actions.notify('success', {message: "User Updated"}))
            .catch((err) => this.props.actions.notify('error', {message: err.response.data.error.message}))
    }

    render() {
        let editProject;
        if (this.state.project) {
            editProject = <EditProject project={this.state.project} onSubmit={this.onSubmit.bind(this)} onChange={this.handleChange}/>;
        }
        return (<div>
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
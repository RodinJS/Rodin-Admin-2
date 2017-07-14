/**
 * Created by Reinchard on 7/14/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ConfirmModal from '../../components/main/confirmModals';
import Paginate from '../../components/main/pagination';
import RdTable from '../../components/main/rdTable';
import {notify} from "../../actions/notification";
import {getProjects, removeProject} from "../../actions/projects";
import {ProjectListRow} from "../../components/project/projectListRow";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerKeys: ['displayName', 'name', 'state', 'owner', 'desciption', 'public', 'templateOf', 'createdAt', 'Edit', 'Delete'],
            itemsPerPage: 10,
            currentPage: 1,
            searchString: '',
            showModal: false,
            orderBy: '-createdAt',

        };

        this.onDelete = this.onDelete.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onOrderBy(fieldName) {
        this.setState({orderBy: fieldName});
        this.props.actions.getProjects({sort: fieldName});
    }

    openModal(project) {
        this.setState({showModal: true, activeProject: project});
    }

    componentWillMount() {
        this.props.actions.getProjects({})
            .then(response => this.setState({projects: response.payload}))
            .catch(err => console.log(err))
    }

    changePage(e) {
        this.setState({currentPage: e});
    }
    componentWillReceiveProps(nextProps) {
        if (!this.state.projects !== nextProps.projects) {
            this.setState({projects: nextProps.projects})
        }
    }

    renderProjects() {
        const indexOfLast = this.state.currentPage * 10;
        const indexOfFirst = indexOfLast - 10;
        let filtered = this.state.projects.filter((u) => u.displayName.indexOf(this.state.searchString) !== -1);
        const current = filtered.slice(indexOfFirst, indexOfLast);
        return current.map((value, key) => <ProjectListRow key={key} project={value}
                                                           onDelete={this.openModal.bind(this, value)}/>)
    }

    onSearch(e) {
        this.setState({searchString: e.target.value});
    }

    onDelete() {
        this.props.actions.removeProject(this.state.activeProject._id)
            .then(() => {
                this.props.actions.notify('success', {message: 'Successfully deleted'});
                this.setState({showModal: false});
            })
            .catch(() => {
                this.props.actions.notify('error', {message: 'Cant delete'})
            })
    }

    onClose() {
        this.setState({showModal: false});
    }
    render() {
        let table, pagination;
        if (this.state.projects && this.state.projects.length > 0) {
            table = <RdTable options={{
                headerKeys: this.state.headerKeys,
                data: this.state.projects,
                rows: this.renderProjects.bind(this),
                order:{
                    orderByField: ['name', 'owner'],
                    orderBy: this.state.orderBy,
                    onOrderBy: this.onOrderBy.bind(this)
                }
            }}/>;
            pagination = <Paginate itemsPerPage={this.state.itemsPerPage} listLength={this.state.projects.length}
                                   onPageChange={(e) => this.changePage(e)}/>;
        }
        let modalOptions = {
            title: 'Delete Project',
            body: `Delete Project`,
            type: 'danger',
            buttonText: 'Delete',
            onSubmit: this.onDelete,
        };
        return (
            <div>
                <h1>{this.props.route.name}</h1>
                <ConfirmModal show={this.state.showModal} onClose={this.onClose} options={modalOptions}/>
                <div className="panel panel-default panel-table">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-3">
                                <input type="text" className="form-control" name="searchString"
                                       onChange={(e) => this.onSearch(e)} placeholder="Search by Project display name"/>
                            </div>
                            {/*<div className="col-md-3">*/}
                            {/*<select className="form-control" name="role"*/}
                            {/*onChange={this.onLimitChange}>*/}
                            {/*{this.state.limits.map((limit, key) => <option value={limit} key={key}>{limit}</option>)}*/}
                            {/*</select>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    {table}
                    <div className="panel-footer">
                        <div className="row text-center">
                            {pagination}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Projects.propTypes = {
    actions: PropTypes.object.isRequired,
    key: PropTypes.number
};
Projects.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps(state) {
    return {
        projects: state.projectsReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getProjects, removeProject, notify}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
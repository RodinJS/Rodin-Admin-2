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
import queryString from "query-string";
import {OrderBy} from "../../actions/queryActions";
import {PROJECTS_ORDER_BY} from "../../constants/index";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerKeys: ['displayName', 'name', 'state', 'owner', 'desciption', 'public', 'templateOf', 'createdAt', 'Edit', 'Delete'],
            itemsPerPage: 10,
            activePage: 1,
            searchString: '',
            showModal: false,
            orderBy: {fieldName: 'created at', type: 'asc'},
            projects: [],
            query: queryString.parse(this.props.history.location.search)

        };
        this.onDelete = this.onDelete.bind(this);
        this.onClose = this.onClose.bind(this);
        this.openModal = this.openModal.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }


    componentDidMount() {
        this.props.actions.getProjects({
            page: this.state.query.page ? this.state.query.page : 1
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.setState({query: queryString.parse(nextProps.location.search)});
        }
        if (this.state.projects !== nextProps.projects.docs) {
            this.setState({
                projects: nextProps.projects.docs,
                total: nextProps.projects.total,
                activePage: this.state.query.page,
                pages: nextProps.pages
            });
        }
    }

    renderProjects() {
        if (this.state.projects.length > 0) {
            let filtered = this.state.projects.filter((u) => u.displayName.indexOf(this.state.searchString) !== -1);
            const current = filtered.slice(0, 50);
            return current.map((value, key) => <ProjectListRow key={key} project={value}
                                                               onDelete={this.openModal.bind(this, value)}/>)
        }

    }

    renderRows() {
        if (this.state.projects && this.state.projects.length > 0) {
            return <RdTable options={{
                headerKeys: this.state.headerKeys,
                data: this.state.projects,
                rows: this.renderProjects.bind(this),
                order: {
                    orderByField: ['name', 'owner'],
                    orderBy: this.state.orderBy,
                    onOrderBy: this.onOrderBy.bind(this)
                }
            }}/>;
        }
    }

    renderPagination() {
        if (this.state.projects && this.state.projects.length > 0) {

            return <Paginate name={"projects"} itemsPerPage={this.state.itemsPerPage} activePage={Number(this.state.activePage)}
                             total={this.state.total} pages={this.state.pages}
                             onPageChange={(e) => this.changePage(e)}/>;
        }
    }

    changePage(e) {
        this.context.router.history.push({search: `page=${e}`});
        this.setState({activePage: e});
    }

    onOrderBy(fieldName, type) {
        this.setState({orderBy: {fieldName: fieldName, type: type}});
        this.props.actions.OrderBy(PROJECTS_ORDER_BY, {fieldName: fieldName, type: type});
    }

    openModal(project) {
        this.setState({showModal: true, activeProject: project});
    }

    onSearch(e) {
        this.setState({searchString: e.target.value});
    }

    onDelete() {
        this.props.actions.removeProject(this.state.activeProject.owner, this.state.activeProject._id)
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
        let modalOptions = {
            title: 'Delete Project',
            body: `Delete Project`,
            type: 'danger',
            buttonText: 'Delete',
            onSubmit: this.onDelete,
        };
        return (
            <div>
                <h1>Projects</h1>
                <ConfirmModal show={this.state.showModal} onClose={this.onClose} options={modalOptions}/>
                <div className="panel panel-default panel-table">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-3">
                                <input type="text" className="form-control" name="searchString"
                                       onChange={(e) => this.onSearch(e)} placeholder="Search by Project display name"/>
                            </div>
                        </div>
                    </div>
                    {this.renderRows()}
                    <div className="panel-footer">
                        <div className="row text-center">
                            {this.renderPagination()}
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
    return {actions: bindActionCreators({getProjects, OrderBy, removeProject, notify}, dispatch)}

}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
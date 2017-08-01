/**
 * Created by xgharibyan on 6/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getUsers, removeUser} from '../../actions/users';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {UsersListRow} from '../../components/user/usersListRow';
import ConfirmModal from '../../components/main/confirmModals';
import Paginate from '../../components/main/pagination';
import RdTable from '../../components/main/rdTable';
import {notify} from "../../actions/notification";
import queryString from "query-string";
import {OrderBy} from "../../actions/queryActions";
import {updateQueryString} from "../../utils/index"
import {USER_ORDER_BY} from "../../constants/index";


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerKeys: ['Email', 'Username', 'Role', 'StorageSize', 'Allow projects count', 'Created at', 'Edit', 'Remove'],
            showModal: false,
            itemsPerPage: 50,
            searchString: '',
            orderBy: {fieldName:'created at', type: 'asc'},
            users: [],
            query: queryString.parse(this.props.location.search)
        };
        this.onDelete = this.onDelete.bind(this);
        this.onClose = this.onClose.bind(this);
        this.openModal = this.openModal.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        this.props.actions.getUsers({
            page: this.state.query.page ? this.state.query.page : 1
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.setState({query: queryString.parse(nextProps.location.search)});
        }
        if (this.props.users !== nextProps.users.docs) {
            this.setState({
                users: nextProps.users.docs,
                total: nextProps.users.total,
                activePage: this.state.query.page,
                pages: nextProps.users.pages
            });
        }
    }

    renderUsers() {
        if (this.state.users.length > 0) {
            let filtered = this.state.users.filter((u) => u.username.indexOf(this.state.searchString) !== -1);
            const current = filtered.slice(0, 50);
            return current.map((value, key) => <UsersListRow key={key} user={value}
                                                             onDelete={this.openModal.bind(this, value)}/>)
        }

    }

    renderRows() {
        if (this.state.users && this.state.users.length > 0) {
            return <RdTable options={{
                headerKeys: this.state.headerKeys,
                data: this.state.users,
                rows: this.renderUsers.bind(this),
                order: {
                    orderByField: ['email', 'username','created at'],
                    orderBy: this.state.orderBy,
                    onOrderBy: this.onOrderBy.bind(this)
                }
            }}/>;
        }
    }

    renderPagination() {
        if (this.state.users && this.state.users.length > 0) {
            return <Paginate name={"users"} itemsPerPage={this.state.itemsPerPage} activePage={Number(this.state.activePage)}
                             total={this.state.total} pages = {this.state.pages}
                             onPageChange={(e) => this.changePage(e)}/>;
        }
    }

    onClose() {
        this.setState({showModal: false});
    }

    openModal(user) {
        this.setState({showModal: true, activeUser: user});
    }



    onDelete() {
        this.props.actions.removeUser(this.state.activeUser.username)
            .then(() => {
                this.props.actions.notify('success', {message: 'Successfully deleted'});
                this.setState({showModal: false});
            })
            .catch(() => {
                this.props.actions.notify('error', {message: 'Cant delete'})
            })
    }

    onOrderBy(fieldName, type) {
        this.setState({orderBy: {fieldName: fieldName, type: type}});
        this.props.actions.OrderBy(USER_ORDER_BY,{fieldName: fieldName, type: type});
    }

    changePage(e) {
        this.context.router.history.replace(updateQueryString('page', e, this.props));
        this.setState({activePage: e});
        this.props.actions.getUsers({page: e});
    }

    onSearch(e) {
        this.setState({searchString: e.target.value});
    }

    render() {
        let modalOptions = {
            title: 'Delete User',
            body: `Delete User ${this.state.activeUser ? this.state.activeUser.username : ''}`,
            type: 'danger',
            buttonText: 'Delete',
            onSubmit: this.onDelete,
        };
        return (
            <div>
                <h1>Users</h1>
                <ConfirmModal show={this.state.showModal} onClose={this.onClose} options={modalOptions}/>
                <div className="panel panel-default panel-table">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-3">
                                <input type="text" className="form-control" name="searchString"
                                       onChange={(e) => this.onSearch(e)} placeholder="Search by Username"/>
                            </div>
                            <div className="col-md-3">
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

Users.propTypes = {
    actions: PropTypes.object.isRequired,
    key: PropTypes.number,
};
Users.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};

function mapStateToProps(state) {
    return {
        users: state.usersReducer,
        location: state.routerReducer.location
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getUsers, OrderBy, removeUser, notify}, dispatch)}

}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
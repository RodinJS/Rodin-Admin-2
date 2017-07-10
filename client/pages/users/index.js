/**
 * Created by xgharibyan on 6/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getList, removeUser} from '../../actions/users';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {UsersListRow} from '../../components/user/usersListRow';
import ConfirmModal from '../../components/main/modals';
import Paginate from '../../components/main/pagination';
import RdTable from '../../components/main/rdTable';
import {notify} from "../../actions/notification";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerKeys: ['Email', 'Username', 'Role', 'StorageSize', 'Allow projects count', 'Created at', 'Edit', 'Remove'],
            showModal: false,
            currentPage: 1,
            itemsPerPage: 10,
            searchString: '',
            orderBy: '-createdAt',
            limits: [50,100,150]
        };
        this.onDelete = this.onDelete.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);
        console.log(this)
    }

    componentWillMount() {
        this.props.actions.getList({})
            .then(response => this.setState({users: response.payload}))
            .catch(err => console.log(err))
    }


    componentWillReceiveProps(nextProps) {
        if (!this.state.users !== nextProps.users) {
            this.setState({users: nextProps.users})
        }
    }

    onClose() {
        this.setState({showModal: false});
    }

    openModal(user) {
        this.setState({showModal: true, activeUser: user});
    }

    renderUsers() {
        const indexOfLast = this.state.currentPage * 10;
        const indexOfFirst = indexOfLast - 10;
        let filtered = this.state.users.filter((u) => u.username.indexOf(this.state.searchString) !== -1);
        const current = filtered.slice(indexOfFirst, indexOfLast);
        return current.map((value, key) => <UsersListRow key={key} user={value}
                                                         onDelete={this.openModal.bind(this, value)}/>)
    }


    onDelete() {
        this.props.actions.removeUser(this.state.activeUser.username)
            .then(res => {
                this.props.actions.notify('success', {message: 'Successfully deleted'});
                this.setState({showModal: false});
            })
            .catch((err) => {
                this.props.actions.notify('error', {message: 'Cant delete'})
            })
    }

    onOrderBy(fieldName) {
        this.setState({orderBy: fieldName});
        this.props.actions.getList({sort: fieldName});
    }

    changePage(e) {
        this.setState({currentPage: e});
    }

    onSearch(e) {
        this.setState({searchString: e.target.value});
    }

    onLimitChange(e) {
        this.props.actions.getList({limit: e.target.value})
    }

    render() {
        let table, pagination;
        if (this.state.users && this.state.users.length > 0) {
            table = <RdTable options={{
                headerKeys: this.state.headerKeys,
                data: this.state.users,
                rows: this.renderUsers.bind(this),
                order: {
                    orderByField: ['email', 'username'],
                    orderBy: this.state.orderBy,
                    onOrderBy: this.onOrderBy.bind(this)
                }

            }}/>;
            pagination = <Paginate itemsPerPage={this.state.itemsPerPage} listLength={this.state.users.length}
                                   onPageChange={(e) => this.changePage(e)}/>;
        }

        let modalOptions = {
            title: 'Delete User',
            body: `Delete User ${this.state.activeUser ? this.state.activeUser.username : ''}`,
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
                                       onChange={(e) => this.onSearch(e)} placeholder="Search by Username"/>
                            </div>
                            <div className="col-md-3">
                                <select className="form-control" name="role"
                                        onChange={this.onLimitChange}>
                                    {this.state.limits.map((limit, key) => <option value={limit} key={key}>{limit}</option>)}
                                </select>
                            </div>
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

Users.propTypes = {
    actions: PropTypes.object.isRequired,
    key: PropTypes.number
};
Users.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps(state) {
    return {
        users: state.usersReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getList, removeUser, notify}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Users);
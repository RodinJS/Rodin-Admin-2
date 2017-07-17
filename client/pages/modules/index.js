/**
 * Created by xgharibyan on 6/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getModules} from '../../actions/modules';
import Paginate from "../../components/main/pagination";
import RdTable from "../../components/main/rdTable";
import {ModuleListRow} from "./module/ModuleRow";
import {Link} from "react-router-dom";


class Modules extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            headerKeys: ['Title', 'Author', 'Submitted Date', 'Approved Date', 'Rejected Date', 'Created At', 'Status'],
            modules: [],
            currentPage: 1,
            itemsPerPage: 10,
            searchString: '',
            orderBy: '-createdAt'
        };
        this.getModulesList = this.getModulesList.bind(this);
    }

    openModal() {

    }
    onOrderBy() {

    }

    componentWillMount() {
        this.getModulesList();
    }

    getModulesList() {
        this.props.actions.getModules()
            .then(response => {
                this.setState({modules: response.payload})
            })
            .catch(err => {
                console.log('err', err);
            })
    }

    renderModules() {
        const indexOfLast = this.state.currentPage * 10;
        const indexOfFirst = indexOfLast - 10;
        let filtered = this.state.modules.filter((m) => m.title.indexOf(this.state.searchString) !== -1);
        const current = filtered.slice(indexOfFirst, indexOfLast);
        return current.map((value, key) => <ModuleListRow key={key} module={value}
                                                          onDelete={this.openModal.bind(this, value)}/>)
    }


    render() {
        let table, pagination;
        if (this.state.modules && this.state.modules.length > 0) {
            table = <RdTable options={{
                headerKeys: this.state.headerKeys,
                data: this.state.modules,
                rows: this.renderModules.bind(this),
                order: {
                    orderByField: ['title', 'author'],
                    orderBy: this.state.orderBy,
                    onOrderBy: this.onOrderBy.bind(this)
                }

            }}/>;
            pagination = <Paginate itemsPerPage={this.state.itemsPerPage} list={this.state.modules}
                                   onPageChange={(e) => this.changePage(e)}/>;
        }

        return (
            <div>
                <Link className="btn btn-primary" to={'/module/create'}><p>Create + </p></Link>
                <h1>{this.props.route.name}</h1>
                <div className="panel panel-default panel-table">
                    <div className="panel-heading">
                        <input type="text" className="form-control" placeholder="Search by Title"/>
                    </div>
                    {table}
                    <div className="panel-footer">
                        <div className="row">
                            {pagination}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modules.propTypes = {
    actions: PropTypes.object.isRequired
};
Modules.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getModules}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Modules)
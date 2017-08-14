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
import * as queryString from "query-string";
import {OrderBy} from "../../actions/queryActions";
import {MODULES_ORDER_BY} from "../../constants/index";

class Modules extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            headerKeys: ['Title', 'Author', 'Submitted Date', 'Approved Date', 'Rejected Date', 'Created At', 'Status'],
            activePage: 1,
            itemsPerPage: 10,
            searchString: '',
            orderBy: {fieldName:'created at', type: -1},
            query: queryString.parse(this.props.history.location.search),
            modules: [],
        };
        this.openModal = this.openModal.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.onRouteUpdate = this.onRouteUpdate.bind(this);
    }

    componentDidMount() {
        this.props.actions.getModules({
            page: this.state.query.page ? this.state.query.page : 1
        });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.setState({query: queryString.parse(nextProps.location.search)});
        }
        if (this.state.modules !== nextProps.modules.docs) {
            this.setState({
                modules: nextProps.modules.docs,
                total: nextProps.modules.total,
                activePage: this.state.query.page,
                pages: nextProps.pages
            });
        }

    }

    renderModules() {
        if (this.state.modules.length > 0) {
            let filtered = this.state.modules.filter((m) => m.title.indexOf(this.state.searchString) !== -1);
            const current = filtered.slice(0, 50);
            return current.map((value, key) => <ModuleListRow key={key} module={value}
                                                              onDelete={this.openModal.bind(this, value)}/>)
        }
    }

    renderRows() {
        if (this.state.modules && this.state.modules.length > 0) {
            return <RdTable options={{
                headerKeys: this.state.headerKeys,
                data: this.state.modules,
                rows: this.renderModules.bind(this),
                order: {
                    orderByField: ['title', 'author'],
                    orderBy: this.state.orderBy,
                    onOrderBy: this.onOrderBy.bind(this)
                }

            }}/>;
        }
    }

    renderPagination() {
        if (this.state.modules && this.state.modules.length > 0) {
            return <Paginate name={"modules"} itemsPerPage={this.state.itemsPerPage} activePage={this.state.activePage}
                             total={this.state.total} pages={this.state.pages}
                             onPageChange={(e) => this.changePage(e)}/>;
        }
    }


    onRouteUpdate(location) {
        this.setState({query: queryString.parse(location.search)})
    }

    openModal() {

    }

    onOrderBy(fieldName, type) {
        this.setState({orderBy: {fieldName: fieldName, type: type}});
        this.props.actions.OrderBy(MODULES_ORDER_BY, {fieldName: fieldName, type: type});
    }

    changePage(e) {
        this.context.router.history.push({search: `page=${e}`});
        this.setState({activePage: e});
    }

    render() {


        return (
            <div>
                <Link className="btn btn-primary" to={'/module/create'}><p>Create + </p></Link>
                <h1>Modules</h1>
                <div className="panel panel-default panel-table">
                    <div className="panel-heading">
                        <input type="text" className="form-control" placeholder="Search by Title"/>
                    </div>
                    {this.renderRows()}
                    <div className="panel-footer text-center">
                        <div className="row">
                            {this.renderPagination()}
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

function mapStateToProps(state) {
    return {
        modules: state.modulesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getModules, OrderBy}, dispatch)}

}

export default connect(mapStateToProps, mapDispatchToProps)(Modules)
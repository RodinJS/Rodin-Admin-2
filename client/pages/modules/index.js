/**
 * Created by xgharibyan on 6/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Module from '../../components/module';
import {getAllModules} from '../../actions/modules';
import Paginate from "../../components/main/pagination";
import RdTable from "../../components/main/rdTable";
import {ModuleListRow} from "./module/ModuleRow";


class Modules extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            headerKeys: ['Title', 'Author', 'Submitted Date', 'Approved Date', 'Rejected Date', 'Created At', 'Status'],
            modules: [],
            showModal: false,
            currentPage: 1,
            itemsPerPage: 10,
            searchString: '',
            orderBy: '-createdAt'
        };
        this.getModulesList = this.getModulesList.bind(this);
    }

    onOrderBy() {

    }

    componentWillMount() {
        this.getModulesList();
    }

    getModulesList() {
        this.props.actions.getAllModules()
            .then(response => {
                this.setState({modules: response.payload})
            })
            .catch(err => {
                console.log('err', err);
            })
    }

    openModal() {
        this.setState({showModal: true})
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
    console.log(state)
    return {}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getAllModules}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Modules)
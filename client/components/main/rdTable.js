/**
 * Created by Reinchard on 6/30/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class RdTable extends Component {
    constructor(props) {
        super(props);
        this.state = {...props.options};
        this.renderHeaders = this.renderHeaders.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, options: nextProps});
    }

    renderHeaders() {
        if (this.props.options.order) {
            let {orderBy, orderByField, onOrderBy} = this.props.options.order;
            return this.state.headerKeys.map((key, k) => {
                if (this.props.options.order && orderByField.indexOf(key.toLowerCase()) !== -1) {
                    return <th key={k}>{key}
                        <span className="pull-right">
                        <i className={`fa ${orderBy.type === 'asc' ? 'fa-sort-desc' : 'fa-sort-asc'}`}
                           aria-hidden="true"
                           onClick={(e) => {
                               onOrderBy(key, orderBy.type === 'asc' ? 'desc' : 'asc')
                           }
                           }/>
        </span></th>
                }else {
                    return <th key={k}>{key}</th>;
                }
            });
        } else {
            return this.state.headerKeys.map((key, k) => <th key={k}>{key}</th>);
        }
    }

    render() {
        return (
            <table className="table table-striped table-bordered table-list table-responsive table-hover">
                <thead>
                <tr>
                    {this.renderHeaders()}
                </tr>
                </thead>
                <tbody>
                {this.state.rows()}
                </tbody>
            </table>
        )
    }
}

RdTable.propTypes = {
    options: PropTypes.object.isRequired
};
RdTable.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(RdTable);
 
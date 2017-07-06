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
        let {orderBy, orderByField, onOrderBy} = this.props.options.order;
        return this.state.headerKeys.map((key, k) => {
            if (this.props.options.order && orderByField.indexOf(key.toLowerCase()) !== -1) {
                return <th key={k}>{key}
                    <span className="pull-right">
                        <i className={`fa ${orderBy[0] === '-' ? 'fa-sort' : 'fa-sort-desc'}`}
                           aria-hidden="true"
                           onClick={(e) =>{
                               onOrderBy(orderBy[0] === '-' ? key.toLowerCase(): `-${key.toLowerCase()}`)
                           }
                           }/>
        </span></th>
            } else {
                return (<th key={k}>{key}</th>)
            }
        })
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
    actions: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired
};
RdTable.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(RdTable);
 
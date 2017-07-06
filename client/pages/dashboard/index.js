/**
 * Created by xgharibyan on 6/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCounts} from "../../actions/main";
import {DashboardCounts} from "../../components/main/dashboardCounts";


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.props.actions.getCounts()
            .then(e => this.setState({data: e.payload}))
            .catch(err => console.log('errr', err))
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Dashboard
                        </h1>
                        <ol className="breadcrumb">
                            <li className="active">
                                <i className="fa fa-dashboard"/> Dashboard
                            </li>
                        </ol>
                    </div>
                </div>
                <DashboardCounts {...this.state.data}/>
            </div>
        );
    }
}

Dashboard.propTypes = {
    actions: PropTypes.object.isRequired
};
Dashboard.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps() {
    return {}
}
function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getCounts}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
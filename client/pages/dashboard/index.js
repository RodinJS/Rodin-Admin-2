/**
 * Created by xgharibyan on 6/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCounts} from "../../actions/main";
import {DashboardCountsItem} from "../../components/main/dashboardCounts";


class Home extends Component {
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

    renderCountSections() {
        let keys = Object.keys(this.state.data);
        return keys.map((item, key) => <DashboardCountsItem key={key} value={this.state.data[item]} type={item}/>)
    }

    render() {
        return (<div>
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
            {this.renderCountSections()}
        </div>)
    }
}

Home.propTypes = {
    actions: PropTypes.object.isRequired
};
Home.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getCounts}, dispatch)}

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
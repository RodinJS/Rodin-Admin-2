/**
 * Created by xgharibyan on 6/7/17.
 */
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import axios from '../../../utils/axiosWrapper/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//Material UI elements
import ModuleElement from '../../../components/module/index';
import {getSingleModule} from "../../../actions/modules";


class Module extends Component {
    constructor(props) {
        super();
        this.state = {
            moduleId:props.match.params.id,
            headerKeys: ['title', 'author', 'submitedDate', 'approvedDate', 'rejectedDate', 'createdAt', 'status'],
            module: false,
        };
    }

    componentDidMount() {
        this.props.actions.getSingleModule(this.state.moduleId);

    }
    render() {
        return (
            this.state.module ? <ModuleElement module={this.state.module}/> : null
        );
    }
}

Module.propTypes = {
    actions: PropTypes.object.isRequired
};
Module.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps(state) {
    console.log(state)
    return {}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getSingleModule}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Module)
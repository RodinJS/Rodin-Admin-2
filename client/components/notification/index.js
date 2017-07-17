import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Notification extends Component {
    constructor() {
        super()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.notification) {
            NotificationManager[nextProps.notification.type](nextProps.notification.message.message);
        }
    }
    render() {
        return (
            <div>
                <NotificationContainer/>
            </div>
        );
    }
}

Notification.propTypes = {
    notification: PropTypes.object
};
Notification.contextTypes = {
};
function mapStateToProps(state) {
    return {
        notification : state.notificationReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(Notification)
/**
 * Created by Reinchard on 7/11/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";

class ModalWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div className="static-modal">
                <Modal show={this.props.show} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.options.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.options.body}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle={this.props.options.type} onClick={this.props.options.onSubmit}>{this.props.options.buttonText}</Button>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

ModalWrapper.propTypes = {
    actions: PropTypes.object.isRequired
};
ModalWrapper.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};
function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({}, dispatch)}

}
export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
 
/**
 * Created by Reinchard on 6/30/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';
class ConfirmModal extends Component {
    close(e) {
        e.preventDefault();
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    render() {
        return (<div className="static-modal">
            <Modal show={this.props.show} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.options.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {this.props.options.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle={this.props.options.type} onClick={this.props.options.onSubmit}>{this.props.options.buttonText}</Button>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>)
    }
}
ConfirmModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
};

export default ConfirmModal
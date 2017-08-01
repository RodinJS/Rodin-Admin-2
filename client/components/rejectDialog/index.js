/**
 * Created by xgharibyan on 6/13/17.
 */

import React from 'react';
import axios from '../../utils/axiosWrapper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';




class RejectDialog extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {}

    }

    setRejectReason(e) {
        this.setState({reason: e.target.value})
    }

    submit() {
        axios.post('/api/getModule/getModules/status/Rejected', {moduleId: this.props.module._id, reason:this.state.reason})
            .then(() => {
                this.setState({message:{success:true, data:'Module rejected'}})
            })
            .catch(err => {
                this.setState({message:{success:false, data:'Whoops matrix overloaded'}})
            })
    }

    render() {
        return (
            <div style={{padding: '20px'}}>
                <TextField defaultValue=""
                           key="rejectReason"
                           name="rejectReason"
                           label="Reject reason"
                           type="text"
                           multiline
                           InputProps={{placeholder: "Reject reason"}}
                           rows="4"
                           onChange={event => this.setRejectReason(event)}
                />
                <Button raised primary disabled={!this.state.reason} onClick={(e) => this.submit()}>Submit</Button>
            </div>
        );
    }
}

export default RejectDialog;
/**
 * Created by xgharibyan on 6/13/17.
 */

import React from 'react';
import axios from '../../utils/axiosWrapper';
import {render} from 'react-dom';
import Button from 'material-ui/Button';

import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import BackIcon from 'material-ui-icons/ArrowBack';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import _map from 'lodash/map';
import _omit from 'lodash/omit';


class ModuleElement extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            module: this.props.module ? this.props.module : {
                title: '',
                description: '',
                author:'',
                url: '',
                status: 'Pending',
                exampleLink: '',
                documentationLink: '',
                email: ''
            }
        };
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.updateModule = this.updateModule.bind(this);
        this.approveModule = this.approveModule.bind(this);
        this.rejectModule = this.rejectModule.bind(this);
        this.createModule = this.createModule.bind(this);
    }

    handleRequestClose() {
        if(this.props.callbackParent)
            return this.props.callbackParent()
    }

    updateModuleData(e, param){
        this.state.module[param] = e.target.value;
        this.setState({ module: this.state.module })
    }

    createModule(){
        axios.post('/api/modules/', this.state.module)
            .then(response=> this.handleRequestClose())
            .catch(err=>{
                console.log('err', err);
            })
    }

    updateModule(){
        axios.put('/api/modules/', this.state.module)
            .then(response=> this.handleRequestClose())
            .catch(err=>{
                console.log('err', err);
            })
    }

    approveModule(){
        axios.post('/api/module/modules/status/Active', {moduleId:this.state.module._id})
            .then(response=>{
                console.log('response', response);
            })
            .catch(err=>{
                console.log('err', err);
            })
    }
    rejectModule(){
        axios.post('/api/module/modules/status/Rejected', {moduleId:this.state.module._id})
            .then(response=>{
                console.log('response', response);
            })
            .catch(err=>{
                console.log('err', err);
            })
    }

    render() {
        const editMode = (
            <div>
                <Button style={{color:'#fff'}} color="contrast" onClick={this.updateModule}>Edit</Button>
                <Button style={{color:'#fff'}} color="contrast" onClick={this.handleRequestClose}>Delete</Button>
                <Button style={{color:'#fff'}} color="contrast" onClick={this.approveModule}>Approve</Button>
                <Button style={{color:'#fff'}} color="contrast" onClick={this.rejectModule}>Reject</Button>
            </div>
        );
        const createMode = (
            <div>
                <Button style={{color:'#fff'}} color="contrast" onClick={this.createModule}>Create</Button>
            </div>
        );
        const inputFields = _map(this.state.module, (val, key)=>{
            console.log(val, key);
            val = val ? val.toString() : '';
            let field = '';
            switch(key){
                case 'thumbnail':
                    field = (<img  key={key} style={{width:'100px'}} src={val}/>);
                    break;
                default:
                    field = key != '__v' && key != '_id' ? (
                        <TextField defaultValue={val}
                                   disabled={key == 'status'}
                                   key={key}
                                   name={key}
                                   label={key}
                                   type="text"
                                   multiline={key == 'description'}
                                   InputProps={{placeholder: key}}
                                   rows={key == 'description' ? '4' : '1'}
                                   onChange={event => this.updateModuleData(event, key)}
                        />
                    ) : null;
                    break
            }

            return field;
        });

        return (
            <div>
                <AppBar style={{background:'#09192E'}}>
                    <Toolbar>
                        {this.props.callbackParent ? <IconButton style={{color:'#fff'}} color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton> : <IconButton style={{color:'#fff'}} color="contrast" onClick={(e)=> window.location.href = '/modules'} aria-label="Close">
                            <BackIcon />
                        </IconButton>}
                        <Typography  type="title" color="inherit" style={{flex: 1, color:'#fff'}}>
                            {this.props.module ? `Edit ${this.props.module.title} module` : 'Create module'}
                        </Typography>
                        {this.props.module ? editMode : createMode}
                    </Toolbar>
                </AppBar>
                <div style={{padding: '100px 0 0 0', overflowX:'scroll'}}>
                    <Grid container
                          align="center"
                          direction="row"
                          justify="center">
                        <Grid item xs={10}>{inputFields}</Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ModuleElement;
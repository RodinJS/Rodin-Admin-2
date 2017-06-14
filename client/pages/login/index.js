/**
 * Created by xgharibyan on 6/7/17.
 */
import React from 'react';
import axios from 'axios';
import {render} from 'react-dom';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import logo from './images/logo.svg';


import styles from './login.scss'


class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            username:'',
            password:''
        };
        this.setCookie = this.setCookie.bind(this);
    }

    setCookie(name, value, days = 7, path = '/') {
        const expires = new Date(Date.now() + days * 864e5).toGMTString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
    }

    login(){
        console.log(this.state);
        axios.post('/api/auth/login', {username:this.state.username, password:this.state.password})
            .then(response=>{
                this.setCookie('token', response.data.token);
                return window.location.href = '/modules';
            })
            .catch(err=>{
                console.log('err', err);
            })
    }

    render () {

        return (
            <div>
                <Grid container
                      align="center"
                      direction="row"
                      justify="center">
                    <Grid item xs={6}>
                        <div className={styles.paperWrapper}>
                            <TextField
                                id="email"
                                label="email"
                                value={this.state.email}
                                onChange={event => this.setState({ username: event.target.value })}
                            />
                            <TextField
                                id="password"
                                label="password"
                                type="password"
                                value={this.state.password}
                                onChange={event => this.setState({ password: event.target.value })}
                            />
                            <Button raised primary onClick={(e)=> this.login()}>Login</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Login;
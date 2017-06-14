/**
 * Created by xgharibyan on 6/7/17.
 */
import React from 'react';
import axios from '../../utils/axiosWrapper';
import {render} from 'react-dom';

//Material UI elements
import Module from '../../components/module';

import styles from './module.scss'


class Dashboard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            moduleId:props.match.params.id,
            headerKeys: ['title', 'author', 'submitedDate', 'approvedDate', 'rejectedDate', 'createdAt', 'status'],
            module: false,
        };
        console.log(this.state);
        this.getModule();
    }

    getModule(){
        return axios.get(`/api/modules/single/${this.state.moduleId}`)
            .then(response => this.setState({module: response.data}))
            .catch(err => {
                console.log('err', err);
            });
    }

    render() {
        return (
            this.state.module ? <Module module={this.state.module}/> : null
        );
    }
}

export default Dashboard;
/**
 * Created by xgharibyan on 6/7/17.
 */
import React from 'react';
import axios from 'axios';
import {render} from 'react-dom';
import Navigation from '../../layout/navigation'
import styles from './dashboard.scss'


class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {

        };
    }

    render () {
        return (
            <div>
                <Navigation state="Dashboard"/>
                <h2>Dashboard</h2>
            </div>
        );
    }
}

export default Dashboard;
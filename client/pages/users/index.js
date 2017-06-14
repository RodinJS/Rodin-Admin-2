/**
 * Created by xgharibyan on 6/7/17.
 */
import React from 'react';
import axios from '../../utils/axiosWrapper';
import {render} from 'react-dom';

//Material UI elements

import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Navigation from '../../layout/navigation'
import styles from './users.scss'


class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            headerKeys: ['email', 'username', 'role', 'storageSize', 'allowProjectsCount', 'createdAt'],
            users: []
        };
        this.getUsers();
    }

    getUsers() {
        return axios.get('/api/user')
            .then(response => this.setState({users: response.data}))
            .catch(err => {
                console.log('err', err);
            })
    }


    navigate(e, module) {
        window.location.href = `/module/${module._id}`
    }

    render() {
        const tableCells = this.state.headerKeys.map((key, k) => <TableCell key={k}>{key}</TableCell>);
        const content = this.state.users.map((module, key) => {
            const innerContent = this.state.headerKeys.map((val, k) => <TableCell style={{cursor:'pointer'}} key={k}>{module[val]}</TableCell>);
            return (<TableRow key={key}>{innerContent}</TableRow>)
        });

        return (
            <div>
                <Navigation state="Users"/>
                <div style={{paddingTop:'100px'}}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>{tableCells}</TableRow>
                            </TableHead>
                            <TableBody>{content}</TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Dashboard;
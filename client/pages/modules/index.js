/**
 * Created by xgharibyan on 6/7/17.
 */
import React from 'react';
import axios from '../../utils/axiosWrapper';
import {render} from 'react-dom';

//Material UI elements
import Button from 'material-ui/Button';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui-icons/Add';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Module from '../../components/module';
import Navigation from '../../layout/navigation';
import NavLink from "react-router-dom/NavLink";


import styles from './modules.scss'


class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            headerKeys: ['title', 'author', 'submitedDate', 'approvedDate', 'rejectedDate', 'createdAt', 'status'],
            modules: []
        };
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.getModulesList();
    }

    getModulesList() {
        return axios.get('/api/modules/all')
            .then(response => this.setState({modules: response.data}))
            .catch(err => {
                console.log('err', err);
            })
    }

    handleRequestClose() {
        this.setState({open: false});
        this.getModulesList();
    }

    handleOpen(e, module) {
        this.setState({open: true, openingModule:module});
    }

    navigate(e, module) {
        window.location.href = `/module/${module._id}`
    }

    render() {
        const tableCells = this.state.headerKeys.map((key, k) => <TableCell key={k}>{key}</TableCell>);
        const content = this.state.modules.map((module, key) => {
            const navLink = `/module/${module._id}`;
            const innerContent = this.state.headerKeys.map((val, k) => <TableCell style={{cursor:'pointer'}} onClick={(e)=>this.navigate(e, module)} key={k}>{module[val]}</TableCell>);
            return (<TableRow key={key}>
                {innerContent}
            </TableRow>)
        });

        return (
            <div>
                <Navigation state="Modules"/>
                <Paper style={{marginTop:'100px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>{tableCells}</TableRow>
                        </TableHead>
                        <TableBody>{content}</TableBody>
                    </Table>
                    <Button style={{position:'absolute', right:'10px', bottom:'10px'}} fab color="primary" onClick={(e) => this.handleOpen(e)}>
                        <AddIcon />
                    </Button>
                    <Dialog
                        fullScreen
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}
                        transition={<Slide direction="up"/>}
                    >
                        {this.state.open ? <Module module={this.state.openingModule} callbackParent={this.handleRequestClose}/> : null}
                    </Dialog>
                </Paper>
            </div>
        );
    }
}

export default Dashboard;
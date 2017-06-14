/**
 * Created by xgharibyan on 6/7/17.
 */
import React from 'react';
import axios from 'axios';
import {render} from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ViewModuleIcon from 'material-ui-icons/ViewModule';
import DashboardIcon from 'material-ui-icons/Dashboard';
import PeopleIcon from 'material-ui-icons/People';
import ExitIcon from 'material-ui-icons/ExitToApp';
import NavLink from "react-router-dom/NavLink";


import styles from './navigation.scss'


class Navigation extends React.Component {
    constructor(props) {
        super();
        this.state = {
            page: props.state,
            open: false,
        };
        this.navigations = [
            {
                icon: <DashboardIcon />,
                title: 'Dashboard',
                link: '/dashboard'
            },
            {
                icon: <ViewModuleIcon />,
                title: 'Modules',
                link: '/modules'
            },
            {
                icon: <PeopleIcon />,
                title: 'Users',
                link: '/users'
            },
            //'/dashboard', '/modules', '/users'
        ];
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({open: false})
    }

    handleOpen() {
        this.setState({open: true})
    }

    render() {
        const menuItems = this.navigations.map((navigation, key) => {
            return (
                <ListItem key={key}>
                    <NavLink style={{display: 'flex', textDecoration: 'none'}} to={navigation.link}>
                        <ListItemIcon>
                            {navigation.icon}
                        </ListItemIcon>
                        <ListItemText primary={navigation.title}/>
                    </NavLink>
                </ListItem>
            )
        });
        return (
            <AppBar style={{background: '#09192E'}}>
                <Toolbar>
                    <IconButton color="#fff" aria-label="Menu" onClick={this.handleOpen}>
                        <MenuIcon style={{color: '#fff'}}/>
                    </IconButton>
                    <Typography style={{color: '#fff'}} type="title" color="inherit">Rodin
                        ({this.state.page})</Typography>
                </Toolbar>
                <Drawer
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    onClick={this.handleClose}
                >
                    {menuItems}
                    <ListItem button>
                        <ListItemIcon>
                            <ExitIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItem>
                </Drawer>
            </AppBar>
        );
    }
}

export default Navigation;
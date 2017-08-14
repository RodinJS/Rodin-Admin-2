/**
 * Created by Reinchard on 8/1/2017.
 */
import React, {Component} from 'react';
import Modules from './modules';
import Home from './dashboard';
import Module from './modules/module';
import Users from './users';
import User from './users/user';
import Projects from './projects';
import Project from './projects/project';
import {Route} from 'react-router';
import Header from '../components/main/header';


const routes = [{
    path: '/dashboard/',
    exact: true,
    component: Home,
    name: 'Home'
},
    {
        path: '/dashboard/module/:id',
        component: Module,
        name: 'Module'
    },
    {
        path: '/dashboard/modules',
        component: Modules,
        name: 'Modules'
    },
    {
        path: '/dashboard/users',
        component: Users,
        name: 'Users'
    },
    {
        path: '/dashboard/user/:username',
        component: User,
        name: 'User'

    },
    {
        path: '/dashboard/projects',
        component: Projects,
        name: 'Projects'
    }, {
        path: '/dashboard/project/:projectId',
        component: Project,
        name: 'Project'
    }];

export default class Dashboard extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="page-wrapper">
                    <Header/>
                    {routes.map((route, key) => <Route key={key} exact={route.exact ? route.exact : false}
                                                       name={route.name}
                                                       path={route.path} component={route.component}/>)}
                </div>
            </div>
        );
    }
}
/**
 * Created by Reinchard on 7/21/2017.
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {configureStore, routerHistory} from "../store/configStore";
import {Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';

const store = configureStore();
//Components
import Header from '../components/main/header';
import Notification from '../components/notification';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Modules from '../pages/modules';
import Module from '../pages/modules/module';
import Users from '../pages/users';
import User from '../pages/users/user';
import Projects from '../pages/projects';
import Project from '../pages/projects/project';

const routes = [
    {
        path: '/',
        exact: true,
        component: Login,
        name:'Home'
    },
    {
        path: '/login',
        component: Login,
        name:'Login'
    },
    {
        path: '/module/:id',
        component: Module,
        name:'Module'
    },
    {
        path: '/modules',
        component: Modules,
        name: 'Modules'
    },
    {
        path: '/users',
        component: Users,
        name: 'Users'
    },
    {
        path: '/user/:username',
        component: User,
        name: 'User'

    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard'
    },
    {
        path: '/projects',
        component: Projects,
        name: 'Projects'
    }, {
        path: '/project/:projectId',
        component: Project,
        name: 'Project'
    }];

export class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={routerHistory}>
                    <div id="wrapper">
                        <Header/>
                        <Notification/>
                        <div id="page-wrapper">
                            <div className="container-fluid">
                                {routes.map((route, key) => <Route key={key} exact={route.exact ? route.exact: false} name={route.name} path={route.path} component={route.component}/>)}
                            </div>
                        </div>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
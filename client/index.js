/**
 * Created by xgharibyan on 6/7/17.
 */
import React from 'react';
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import BrowserRouter from "react-router-dom/BrowserRouter";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import { MuiThemeProvider } from 'material-ui/styles';
import { renderRoutes } from 'react-router-config'


import axios from './utils/axiosWrapper';

//Components
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Modules from './pages/modules';
import Module from './pages/module';
import Users from './pages/users';
injectTapEventPlugin();

const Root = ({ route }) => (
    <div>
        {renderRoutes(route.routes)}
    </div>
);

const routes = [{
    component: Root,
    routes: [
        {
            path: '/',
            exact: true,
            component: Login
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/module/:id',
            component: Module,
        },
        {
            path: '/modules',
            component: Modules,
        },
        {
            path: '/users',
            component: Users,
        },
        {
            path: '/dashboard',
            component: Dashboard,
        }
    ]
}];

class App extends React.Component {
    render () {
        return (
            <MuiThemeProvider>
                <BrowserRouter >
                    {renderRoutes(routes)}
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

render(<App/>, document.getElementById('app'));
/**
 * Created by xgharibyan on 6/7/17.
 */
import './assets/main.scss';
import 'react-notifications/src/notifications.scss';
//
import React from 'react';
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import BrowserRouter from "react-router-dom/BrowserRouter";
import {Provider} from 'react-redux';
import {MuiThemeProvider} from 'material-ui/styles';
import {renderRoutes} from 'react-router-config'
import configStore from "./store/configStore";
const store = configStore();

//Components
import Header from './components/main/header';
import Notification from './components/notification';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Modules from './pages/modules';
import Module from './pages/modules/module';
import Users from './pages/users';
import User from './pages/users/user';
import Projects from './pages/projects';
import Project from './pages/projects/project';


injectTapEventPlugin();

const Root = ({route}) => {
    return (
        <div id="wrapper">
            <Header/>
            <Notification/>
            <div id="page-wrapper">
                <div className="container-fluid">
                    {renderRoutes(route.routes)}
                </div>
            </div>
        </div>
    )
};

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
            name: 'Users'
        },
        {
            path: '/user/:username',
            component: User
        },
        {
            path: '/dashboard',
            component: Dashboard,
        },
        {
            path: '/projects',
            component: Projects,
        }, {
            path: '/project/:projectId',
            component: Project,
        }
    ]
}];

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <BrowserRouter >
                        {renderRoutes(routes)}
                    </BrowserRouter>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

render(<App/>, document.getElementById('app'));
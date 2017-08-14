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
import {PrivateRoute} from './Private';
import Notification from '../components/notification';
import Login from '../pages/login';
import Dashboard from '../pages/index';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={routerHistory}>
                    <div className="container-fluid">
                        <Notification/>
                        <Route name={'login'} exact={true} path='/login' component={Login}/>
                        <PrivateRoute name={'dashboard'} path="/dashboard" component={Dashboard}/>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
/**
 * Created by xgharibyan on 6/7/17.
 */
import React from 'react';
import {render} from 'react-dom';

import BrowserRouter from "react-router-dom/BrowserRouter";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";

//Components
import Login from './pages/login';

class App extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={ Login }/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

render(<App/>, document.getElementById('app'));
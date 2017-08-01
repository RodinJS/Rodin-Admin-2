/**
 * Created by xgharibyan on 6/7/17.
 */
import './assets/main.scss';
import 'react-notifications/src/notifications.scss';
//
import React from 'react';
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {App} from './container/App';

injectTapEventPlugin();



render(<App/>, document.getElementById('app'));
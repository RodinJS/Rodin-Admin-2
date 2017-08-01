/**
 * Created by Reinchard on 6/23/2017.
 */
import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const middleware = routerMiddleware(history);

import thunk from 'redux-thunk'

export function configureStore() {
    return createStore(rootReducer, applyMiddleware(thunk, reduxImmutableStateInvariant(), middleware))
};
export const routerHistory = history;
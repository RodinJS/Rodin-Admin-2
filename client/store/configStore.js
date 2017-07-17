/**
 * Created by Reinchard on 6/23/2017.
 */
import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk, reduxImmutableStateInvariant()));
    return store
}
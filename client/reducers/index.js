/**
 * Created by Reinchard on 6/23/2017.
 */
import {combineReducers} from 'redux';
import authReducer from './login';
import modulesReducer from './modules';
import usersReducer from './users';
import userReducer from './user';
import notificationReducer from './notifications';
import countsReducer from './counts';

const rootReducer = combineReducers({authReducer, modulesReducer, usersReducer, userReducer, notificationReducer, countsReducer});


export default rootReducer
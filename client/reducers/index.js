/**
 * Created by Reinchard on 6/23/2017.
 */
import {combineReducers} from 'redux';
import authReducer from './login';
import modulesReducer from './modules/modules';
import moduleReducer from './modules/module';
import usersReducer from './users/users';
import userReducer from './users/user';
import projectsReducer from './projects/projects';
import projectReducer from './projects/project';
import notificationReducer from './notifications';
import countsReducer from './counts';

const rootReducer = combineReducers({
    authReducer,
    modulesReducer,
    moduleReducer,
    usersReducer,
    userReducer,
    notificationReducer,
    countsReducer,
    projectsReducer,
    projectReducer
});


export default rootReducer
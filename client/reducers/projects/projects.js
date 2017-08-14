/**
 * Created by Reinchard on 7/10/2017.
 */
import {GET_PROJECTS_SUCCESS, PROJECTS_ORDER_BY, REMOVE_PROJECT} from '../../constants/index';
import * as _ from 'lodash';

export default function projectsReducer(state = [], action) {
    switch (action.type) {
        case GET_PROJECTS_SUCCESS: {
            return action.payload
        }
        case PROJECTS_ORDER_BY: {
            if(['created at'].some(i => i === action.payload.fieldName.toLowerCase())) {
                return Object.assign({}, state ,{docs:_.orderBy(state.docs,(o) => - (new Date(o.createdAt).getDate())).reverse()});
            }
            return Object.assign({}, state ,{docs:_.orderBy(state.docs, [action.payload.fieldName.toLowerCase()], [action.payload.type]) });
        }
        case REMOVE_PROJECT: {
            return  state.filter((item, i) => item._id !== action.key);
        }
        default:
            return state;
    }
}
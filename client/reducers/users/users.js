/**
 * Created by Reinchard on 6/23/2017.
 */
import {GET_USERS_FAIL, GET_USERS_SUCCESS, REMOVE_USER, USER_ORDER_BY} from '../../constants/index';
import * as _ from "lodash";
import moment from 'moment';

export default function usersReducer(state = [], action) {
    switch (action.type) {
        case GET_USERS_SUCCESS: {
            return action.payload;
        }
        case USER_ORDER_BY: {
            if(['created at'].some(i => i === action.payload.fieldName.toLowerCase())) {
                return Object.assign({}, state ,{docs:_.orderBy(state.docs,(o) => - (new Date(o.createdAt).getDate())).reverse()});
            }
            return Object.assign({}, state ,{docs:_.orderBy(state.docs, [action.payload.fieldName.toLowerCase()], [action.payload.type]) });
        }
        case GET_USERS_FAIL: {
            return [...action.payload];
        }
        case REMOVE_USER: {
            return state.filter((item, i) => item.username !== action.key);
        }
        default:
            return state;
    }
}

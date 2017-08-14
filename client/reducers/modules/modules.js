/**
 * Created by Reinchard on 6/23/2017.
 */
import { GET_MODULES_FAIL, GET_MODULES_SUCCESS, MODULES_ORDER_BY} from '../../constants/index';
import * as _ from "lodash";

export default function modulesReducer(state = [], action) {
    switch (action.type) {
        case GET_MODULES_SUCCESS: {
            return action.payload;
        }
        case MODULES_ORDER_BY: {
            if(['created at'].some(i => i === action.payload.fieldName.toLowerCase())) {
                return Object.assign({}, state ,{docs:_.orderBy(state.docs,(o) => - (new Date(o.createdAt).getDate())).reverse()});
            }
            return Object.assign({}, state ,{docs:_.orderBy(state.docs, [action.payload.fieldName.toLowerCase()], [action.payload.type]) });
        }
        case GET_MODULES_FAIL: {
            return [...action.payload];
        }
        default:
            return state
    }
}

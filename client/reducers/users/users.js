/**
 * Created by Reinchard on 6/23/2017.
 */
import {GET_USERS_FAIL, GET_USERS_SUCCESS, REMOVE_USER, USERS_SORT_BY} from '../../constants/index';

export default function usersReducer(state = [], action) {
    switch (action.type) {
        case GET_USERS_SUCCESS: {
            return [...action.payload];
        }
        case GET_USERS_FAIL: {
            return [...action.payload];
        }
        case REMOVE_USER: {
            return  state.filter((item, i) => item.username !== action.key);
        }
        default:
            return state;
    }
}

/**
 * Created by Reinchard on 7/14/2017.
 */
import {GET_PROJECT_SUCCESS} from '../../constants/index';
export default function projectReducer(state = {}, action) {
    switch (action.type) {
        case GET_PROJECT_SUCCESS: {
            return Object.assign({}, action.payload)
        }
        default:
            return state;
    }
}
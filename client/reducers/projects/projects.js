/**
 * Created by Reinchard on 7/10/2017.
 */
import {GET_PROJECTS_SUCCESS, REMOVE_PROJECT} from '../../constants/index';
export default function projectsReducer(state = [], action) {
    switch (action.type) {
        case GET_PROJECTS_SUCCESS: {
            return [...action.payload]
        }
        case REMOVE_PROJECT: {
            return  state.filter((item, i) => item._id !== action.key);
        }
        default:
            return state;
    }
}
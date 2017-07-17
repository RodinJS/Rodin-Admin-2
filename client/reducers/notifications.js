/**
 * Created by Reinchard on 6/29/2017.
 */

export default function notificationReducer(state = {}, action) {
    switch (action.type) {
        case 'info':
            return Object.assign({}, {type: action.type, message: action.payload});
        case 'success':
            return Object.assign({}, {type: action.type, message: action.payload});

        case 'warning':
            return Object.assign({}, {type: action.type, message: action.payload});

        case 'error':
            return Object.assign({}, {type: action.type, message: action.payload});

        default:
            return state;
    }
}
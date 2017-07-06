/**
 * Created by Reinchard on 6/29/2017.
 */
export function notify(type, data) {
    return {type, payload: data}
}
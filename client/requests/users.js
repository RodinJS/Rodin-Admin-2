/**
 * Created by Reinchard on 6/23/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';

const rootURL = '/api/admin/user';

export function list({sort ='-createdAt', limit = 50}) {
    return axiosInstance.get(`${rootURL}` , {
        params:{
            sort,
            limit
        }
    });
}

export function get(username) {
    return axiosInstance.get(`${rootURL}/${username}`);
}

export function update(username, data) {
    return axiosInstance.put(`${rootURL}/${username}`, data);
}

export function remove(username) {
    return axiosInstance.delete(`${rootURL}/${username}`);
}
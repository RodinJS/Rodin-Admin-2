/**
 * Created by Reinchard on 6/23/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';

const rootURL = '/api/admin/user';

export function getUsers({sort, page = 1}) {
    return axiosInstance.get(`${rootURL}` , {
        params:{
            sort,
            page
        }
    });
}

export function getUser(username) {
    return axiosInstance.get(`${rootURL}/${username}`);
}

export function updateUser(username, data) {
    return axiosInstance.put(`${rootURL}/${username}`, data);
}

export function removeUser(username) {
    return axiosInstance.delete(`${rootURL}/${username}`);
}
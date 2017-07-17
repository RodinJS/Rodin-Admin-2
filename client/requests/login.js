/**
 * Created by Reinchard on 6/23/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';
const rootURL = '/api/auth';

export function login(credentials) {
    return axiosInstance.post(`${rootURL}/login`, credentials)
}

export function logout() {
    return axiosInstance.post(`${rootURL}/logout`)
}
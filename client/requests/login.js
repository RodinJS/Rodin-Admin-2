/**
 * Created by Reinchard on 6/23/2017.
 */
import axiosInstance from '../utils/axiosWrapper/index';
export function signIn(credentials) {
    return axiosInstance.post('/api/auth/login', credentials)
}

export function signOut() {
    return axiosInstance.post('/api/auth/logout')
}
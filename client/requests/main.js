/**
 * Created by Reinchard on 7/3/2017.
 */

import axiosInstance from '../utils/axiosWrapper/index';
export function getCounts() {
    return axiosInstance.get('/api/admin/counts')
}
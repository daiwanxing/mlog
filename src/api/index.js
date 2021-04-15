import axios from '../utils/axios-utils';


export function fetchBanner () {
    return axios.get('/api/banner');
}

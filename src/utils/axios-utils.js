import axios from "axios";
import { get, isObject } from 'lodash-es';

const instance = axios.create({
    timeout: 5000
});


instance.interceptors.response.use(function (res) {
    return res.data
}, function (error) {
    let res = get(error, 'response.data');
    res = isObject(res) ? res : {};
    const message = error.message || error.statusText || error.stack;
    const errorCodeResult = {
        message,
        response: get(error, 'response'),
        ...res
    };
    return Promise.reject(errorCodeResult)
});

export default instance;

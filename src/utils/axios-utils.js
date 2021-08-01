import axios from "axios";
import { get, isObject } from 'lodash-es';

const DEV_URL = "http://localhost:3000"; // dev
const DEPLOY_URL = "https://music-api-chi.vercel.app"; // pro

const instance = axios.create({
    baseURL: import.meta.env.DEV ? DEV_URL : DEPLOY_URL,
    timeout: 10000,
    withCredentials: true
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

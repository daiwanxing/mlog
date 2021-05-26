import axios from '../utils/axios-utils';

/***
 * 手机登录
 * @param phone 手机号
 * @param password 密码
 */
export function login (phone, password) {
    return axios.post("/login/cellphone", {
        phone,
        password
    });
}

/**
 * 获取登录状态
 */
export function loginStatus () {
    return axios.get("/login/status");
}
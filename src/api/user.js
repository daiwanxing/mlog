import axios from '../utils/axios-utils';
import md5 from "md5";

/***
 * 手机登录
 * @param phone 手机号
 * @param password 密码
 */
export function login (phone, password) {
    const md5Pwd = md5(password);
    return axios.post("/login/cellphone", {
        phone,
        password: md5Pwd,
        md5_password: md5Pwd
    });
}

/**
 * 获取登录状态
 */
export function loginStatus () {
    return axios.get("/login/status");
}
import axios from '../utils/axios-utils';
import md5 from "md5";

/***
 * 手机登录
 * @param phone 手机号
 * @param password 密码
 */
export function login (phone, password) {
    const md5Pwd = md5(password);
    return axios.get("/login/cellphone", {
        params: {
            phone,
            password: md5Pwd,
            md5_password: md5Pwd
        }
    });
}

/**
 * 获取登录状态
 */
export function loginStatus () {
    let date = new Date().getTime();  // 防止缓存
    return axios.get("/login/status", {
        params: {
            date
        }
    });
}

/***
 * 获取用户信息
 * @param uid 用户id
 */
export function userInfo (uid) {
    return axios.get("/user/detail", {
        params: {
            uid
        }
    });
}


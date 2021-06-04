"use strict";

import { useRouter } from "vue-router";
import { debounce } from "lodash-es";
import store from "@/store/index";

/**
 * 将数字转换成多少万
 * 例如： 139231 转成13.9万 1302310
 */
export function translatorToMillon(number) {
    if (typeof number !== "number" || number < 100000) return number;
    number = number.toString();
    return (
        number.substr(0, number.length - 4) +
        "." +
        number.substr(number.length - 4, 1) +
        "万"
    );
}

export function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key, defaultValue = {}) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

/**
 * 清除cookie
 * @param cookieName
 * @param path
 */
export function clearCookie(cookieName, path = "/") {
    if (!cookieName) {
        // 如果不传，则删掉全部的cookie
        let cookieList = document.cookie.split(";");
        cookieList.forEach((item) => {
            if (item) {
                let cookieName = item.split("=")[0];
                clearCookie(cookieName);
            }
        });
    } else {
        document.cookie = `${cookieName}=0;expires=${new Date().toUTCString()};path=${path}`;
    }
}

export function authOperate(handler) {
    const router = useRouter();
    // 如果未登录跳转到登录页面
    if (store.state.login) {
        handler();
    } else {
        router.push({
            name: "login",
        });
    }
}


export function scrollPageBottom (cb) {
    const handler = debounce(function () {
        const length = document.documentElement.scrollHeight - window.innerHeight;
        if (length - 3 < window.pageYOffset) {
            cb && cb();
        }
    });

    return handler;
}
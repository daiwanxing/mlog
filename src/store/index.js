"use strict";
import { reactive } from "vue";

let debug = true;

const commit = function (commit, paylaod = {}) {
    if (typeof commit === "object") {
        const { type, payload: commitPayload } = commit;
        commit = type;
        paylaod = commitPayload;
    }
    if (this.mutations[commit]) {
        this.mutations[commit](this.state, paylaod);
    }
};

const mutations = {
    setAccount(state, payload) {
        state.accountInfo = payload;
        if (debug) {
            console.info("state account has been changed", state.accountInfo);
        }
    },
    setUserInfo(state, payload) {
        state.userInfo = payload;
    },
    setUserLogin(state, payload) {
        state.login = payload;
    },
};

let store = Object.create({
    commit,
});

store.state = reactive({
    userInfo: {}, // 用户信息
    accountInfo: {}, // 账户信息
    login: false, // 是否已登录
});

store.mutations = mutations;

export default store;

import { reactive } from "vue";

export const store = {
    state: reactive({
        accountInfo: {}, // 账户信息
        profileInfo: {}, // 用户信息
        login: false // 是否已登录
    }),
    mutations: {
        setLoginState (newValue = false) {
            store.state.login = newValue;
        },
        updateUserInfo (user = {}) {
            store.state.profileInfo = user;
        }
    },
    getters: {
        getLoginUser () {
            return {
                login: store.state.login,
                profile: store.state.profileInfo
            }
        }
    }
}
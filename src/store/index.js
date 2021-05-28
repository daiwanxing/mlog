import { reactive } from "vue";
import { isEmpty } from "lodash-es";

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
            if (!isEmpty(user)) {
                this.setLoginState(true);
            }
        }
    },
    getters: {
        getLoginState () {
            return store.state.login;
        },
        getUserInfo () {
            return store.state.profileInfo;
        }
    },
    commit (mutationName, data) {
        store.mutations[mutationName](data);
    }
}
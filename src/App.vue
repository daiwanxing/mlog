<template>
  <div class="mobile-container">
    <router-view></router-view>
  </div>
</template>

<script>
import store from '@/store/index';
import { loginStatus } from "@/api/user";

export default {
  name: "netMusic-App",
  setup () {
    checkLogin();
    function checkLogin () {
      loginStatus().then(({ data }) => {
        if (data.account && data.profile) {
          store.commit("setUserLogin", true);
          store.commit("setUserInfo", data.profile);
          store.commit({
            type: "setAccount",
            payload: data.account
          })
        }
      }).catch(e => {
        console.error(e);
      })
    }
  }
};
</script>

<style>
:root {
  --mainTheme: #dd0000;
  --textTheme: #dd001b;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
  /* 长按 a 标签，会出现背景色 仅限于移动端 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

ul {
  list-style: none;
}

.mobile-container {
  max-width: 1024px;
  margin: auto;
}
</style>

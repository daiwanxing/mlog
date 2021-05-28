<template>
  <main class="login-content">
    <form class="login-form" name="login-form">
      <div class="login-phone-input">
        <input
          type="tel"
          placeholder="请输入手机号"
          v-model.trim="phone"
          @input="inputValidCheck"
          maxlength="11"
        />
      </div>
      <div class="login-password-input">
        <input
          type="password"
          autocomplete
          placeholder="请输入密码"
          v-model.trim="pwd"
          @keypress.enter="checkValidHandler"
        />
      </div>
      <div class="auto-login-box">
        <div class="al-box-wrap">
          <input
            type="checkbox"
            name="autologin"
            id="login-auto"
            v-model="isAutoLogin"
          />
          <label for="login-auto" class="at-login">自动登录</label>
        </div>
        <a href="#" class="fgt-pwd">忘记密码</a>
        <p class="error-tips" v-if="!isValid">{{ errorText }}</p>
      </div>
      <button
        type="button"
        @click="checkValidHandler"
        :disabled="btnDisabled"
        :class="{ 'dis-btn': btnDisabled }"
      >
        登录
      </button>
      <p class="back-home">
        <a href="#" @click="redirectHome">&lt;&nbsp;返回首页</a>
      </p>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { store } from '@/store/index';
import { useRouter } from "vue-router";
import { login } from "@/api/user";
import { clearCookie } from '@/utils/util.js';

const errorText = ref("");
const isValid = ref(true);
const phone = ref("");
const pwd = ref("");
const btnDisabled = ref(false);

function phoneVailidPromise() {
  const PHONE_REG = /^1[3456789]\d{9}$/g;
  return new Promise((resovle, reject) => {
    let val = phone.value.toString();
    if (!PHONE_REG.test(val)) {
      reject("请输入正确的手机号");
      return;
    }
    if (!pwd.value) {
      reject("请输入密码");
      return;
    }
    resovle();
  });
}

async function checkValidHandler() {
  try {
    btnDisabled.value = true;
    await phoneVailidPromise();
    isValid.value = true;
    errorText.value = "";
  } catch (e) {
    errorText.value = e;
    isValid.value = false;
  } finally {
    if (isValid.value) {
      loginHandler();
    }
    btnDisabled.value = false;
  }
}

function loginHandler() {
  login(phone.value, pwd.value).then((res) => {
    if (res.code === 502 || res.code === 501) {
        errorText.value = res.message;
        isValid.value = false;
    } else {
      localStorage.setItem("uid", res.account.id);
      store.commit("updateUserInfo", res.profile);
      redirectHome();
    }
  });
}

function inputValidCheck(e) {
  let val = parseInt(e.target.value);
  phone.value = isNaN(val) ? "" : val;
}

const router = useRouter();
function redirectHome() {
  router.push("/mlog/");
}

const isAutoLogin = ref(true); // 默认勾选”自动登录“
window.addEventListener("beforeunload", function () {
  if (isAutoLogin.value === false) clearCookie();
});
</script>

<style scoped lang="scss">
.login-content {
  height: 100vh;
  overflow: hidden;
  background: #f2f2f2;

  .login-form {
    margin: 10vh auto 0;
    max-width: 215px;
    padding: 24px;
    border-radius: 8px;
    background-color: #e3e3e3;
    text-align: center;
  }

  .login-phone-input {
    margin-bottom: 16px;
  }

  .auto-login-box {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 20px 0;
  }

  .al-box-wrap {
    padding-left: 10px;

    .at-login {
      margin-left: 4px;
      vertical-align: 10px;
    }
  }

  .fgt-pwd:hover {
    text-decoration: underline;
  }

  .fgt-pwd,
  .at-login {
    color: #666;
    font-size: 14px;
  }

  [type="checkbox"]:focus-visible {
    outline: 2px solid orange;
  }

  input {
    text-indent: 6px;
    height: 30px;
    outline: none;

    &::-webkit-input-placeholder {
      font-size: 14px;
      color: #666;
    }
  }

  button {
    width: 215px;
    height: 36px;
    color: #fff;
    border-radius: 3px;
    border: none;
    background-image: linear-gradient(to right bottom, #4c8aee, #1e66c1);
    cursor: pointer;

    &.dis-btn {
      opacity: 0.5;
    }

    &:active {
      opacity: .9;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgb(0 102 255 / 30%);
    }
  }

  .back-home {
    text-align: left;
    font-size: 14px;
    color: #666;
    a {
      color: inherit;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .error-tips {
    position: absolute;
    bottom: 10px;
    margin: 0;
    padding-left: 30px;
    background: url("https://s2.music.126.net/style/web2/img/icon.png?998bae92fba6618116750ad8d5a09f61")
      no-repeat 0 9999px;
    background-position: -44px -270px;
    font-size: 12px;
    color: var(--textTheme);
  }
}
</style>
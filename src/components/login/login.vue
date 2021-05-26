<template>
  <main class="login-content">
    <form class="login-form" name="login-form">
      <div class="login-phone-input">
        <input
          type="text"
          placeholder="请输入手机号"
          v-model.trim="phone"
          @input="validCheck"
        />
      </div>
      <div class="login-password-input">
        <input type="password" placeholder="请输入密码" v-model.trim="pwd" />
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
      </div>
      <button type="button" @click="loginHandler">登录</button>
      <p style="text-align: left; font-size: 14px">
          <a href="#" style="color: #666" @click="redirectHome">&lt;&nbsp;返回首页</a>
      </p>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, loginStatus } from "@/api/user";

const isAutoLogin = ref(false);
const phone = ref("");
const pwd = ref("");
const router = useRouter();

function loginHandler() {
  login(phone.value, pwd.value).then((res) => {
    console.log(res);
  });
}

function redirectHome () {
    router.push("/mlog/");
}

// 有效性验证
function validCheck(e) {
  let val = e.target.value;
  if (val && isNaN(val)) {
    phone.value = "";
  }
  phone.value = val;
}
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

  .login-phone-input,
  .login-password-input {
    margin-bottom: 16px;
  }

  .auto-login-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
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

    &:hover,
    &:active {
      opacity: 0.9;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgb(0 102 255 / 30%);
    }
  }
}
</style>
<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: "netMusic-App"
  }
</script>

<style>
:root {
  --mainTheme: #d43c33;
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
</style>

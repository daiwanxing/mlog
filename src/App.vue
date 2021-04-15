<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <hello-world msg="Hello Vue 3 + Vite" />
  <h1>Success start you web app!</h1>
</template>

<script>
  import helloWorld from '@/components/HelloWorld.vue';

  export default {
      name: "App",
      components: {
          helloWorld
      },
      mounted () {
          console.log('Success start web app! ');
      }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

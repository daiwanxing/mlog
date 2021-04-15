<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <hello-world msg="Hello Vue 3 + Vite" />
</template>

<script>
  import helloWorld from '@/components/HelloWorld.vue';

  export default {
      name: "App",
      components: {
          helloWorld
      },
      mounted () {
          console.log('...');
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

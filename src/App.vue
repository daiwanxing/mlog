<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <hello-world msg="Hello Vue 3 + Vite" />
  <h1>Success start you web app!</h1>
  <ul>
    <li v-for="item in bannerList">
      <img :src="item.imageUrl" :alt="item.typeTitle">
    </li>
  </ul>
</template>

<script>
  import helloWorld from '@/components/HelloWorld.vue';
  import { fetchBanner } from './api/index';
  import { reactive, toRefs } from 'vue';

  export default {
      name: "App",
      components: {
          helloWorld
      },
      // setup 不能设置为异步函数
      setup () {
        const data = reactive({
            bannerList: []
        });
        fetchBanner().then(result => {
            data.bannerList = result.banners || [];
        });

        return {
            ...toRefs(data)
        }
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

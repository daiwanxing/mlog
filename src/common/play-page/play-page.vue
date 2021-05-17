<template>
  <section class="play-audio-page">
      <h1>播放界面</h1>
      <audio src=""></audio>
  </section>
</template>

<script setup="props, { emit }">
import { defineProps, useContext } from "vue";

const props = defineProps({
    msg: {
        type: String,
        default: "123"
    }
});

// 这种setup语法糖，就是vue执行的时候给你写的代码给包了一层，就是相当于你用node写代码一样的，e


console.log(props);

const context = useContext();
/**
 * 播放歌曲界面
 */
</script>

<style scoped lang="scss">
</style>

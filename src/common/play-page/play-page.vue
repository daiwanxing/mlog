<template>
  <section class="play-audio-page">
      <h1>播放界面</h1>
      <audio src=""></audio>
      <div></div>
  </section>
</template>

<script setup>
const color = "red";
</script>

<style scoped lang="scss">


div {
    color: v-bind(color);
    --img: "https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png"
    height: 300px;
    background: var(--img);
    background-size: cover;
}
</style>

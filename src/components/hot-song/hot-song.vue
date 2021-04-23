<template>
  <section class="hot-song-list-box">
    <div class="hot-song-cover">
        <div class="hot-song-icon"></div>
        <div class="hot-date">更新日期：{{today}}</div>
    </div>
    <div class="hot-list">
        <loading></loading>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import loading from "@/common/loading/loading.vue";

const today = computed(() => {
    let date = new Date();
    return date.getMonth() + 1 + '月' + date.getDay() + '日';
});
</script>

<style lang="scss">
.hot-song-list-box {
  .hot-song-cover {
    height: 150px;
    padding-left: 20px;
    overflow: hidden;
    background: url("https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .hot-song-icon {
      width: 142px;
      height: 67px;
      margin-top: 30px;
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
      background-repeat: no-repeat;
      background-size: 166px 97px;
      background-position: -24px -30px;
  }

  .hot-date {
      margin-top: 10px;
      font-size: 10px;
      color: #fff;
  }
}
</style>

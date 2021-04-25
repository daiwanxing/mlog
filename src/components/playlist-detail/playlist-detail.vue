<template>
  <main>
    <section class="playlist-cover-bg">
      <div class="playlist-cover"></div>
      <div class="playlist-desc">
        <h2>呆呆的情话管子，一直在这里等你</h2>
        <div class="playlist-author"></div>
      </div>
    </section>
    <section class="playlist-songs">
      <div class="pl-song-title">歌曲列表</div>
      <song-list :songs="[]"></song-list>
    </section>
  </main>
</template>

<script>
/***
 * 歌单详情组件
 */
import { ref } from "vue";
import { useRoute } from "vue-router";
import songList from "@/common/song-list/song-list.vue";

export default {
  components: {
    songList,
  },
  setup() {
    const routes = useRoute();
    const playListId = ref(routes.query.id); // 取出歌单id， 请求歌单详情信息
  },
};
</script>

<style scoped lang="scss">
main {
  .playlist-cover-bg {
    display: flex;
    padding: 30px 10px 30px 15px;
    background: #e2e2e2;

    .playlist-cover {
      width: 126px;
      height: 126px;
      object-fit: cover;
      background: #ccc;
    }

    .playlist-desc {
      margin-left: 10px;

      h2 {
        margin: 4px 0;
        color: #000;
        font-size: 17px;
        font-weight: 400;
      }
    }
  }
  .pl-song-title {
    background-color: #eeeff0;
    color: #666;
    line-height: 23px;
    font-size: 12px;
    padding: 0 6px;
  }
}
</style>
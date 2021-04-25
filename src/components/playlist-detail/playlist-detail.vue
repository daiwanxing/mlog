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

// 今天的任务，完成歌单详情界面所有元素展示，接口联调
// 明天任务，用户主页展示
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import songList from "@/common/song-list/song-list.vue";
import { fetchSongList, fetchSongListDynamic } from "@/api/song-list";

export default {
  components: {
    songList,
  },
  setup() {
    const router = useRouter();
    const routes = useRoute();
    const playListId = ref(routes.query.id); // 取出歌单id， 请求歌单详情信息
    if (!playListId.value) {
        // 如果不存在歌单id 直接返回到上一级路由
        return router.back();
    }
    onMounted(function () {
        fetchSongList(playListId.value)
            .then(result => {
                console.log(result);
            });
    });
  }
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
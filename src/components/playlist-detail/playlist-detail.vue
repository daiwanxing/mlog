<template>
  <main>
    <template v-if="loading"></template>
    <section class="playlist-cover-bg" v-else>
      <div class="playlist-cover">
        <div
          class="cover-bg-blur"
          :style="[{ 'background-image': `url(${info.coverImgUrl})` }]"
        ></div>
        <img :src="info.coverImgUrl" :alt="info.name" />
      </div>
      <div class="playlist-desc">
        <h2>{{ info.name }}</h2>
        <div class="playlist-author">
          <!-- 要改成router-link 标签 -->
          <router-link to="/mlog" class="author-link">
            <img
              :src="info.creator.avatarUrl"
              :alt="info.creator.nickname"
              class="author-avatar"
            />
            <span class="author-name">{{ info.creator.nickname }}</span>
          </router-link>
        </div>
        <div class="playlist-short-desc">{{ info.description }}</div>
      </div>
    </section>
    <section class="playlist-songs">
      <div class="pl-title">歌曲列表</div>
      <song-list :songs="songs" isReference></song-list>
    </section>
    <section class="review-comments">
      <!-- 评论列表区 -->
        <div class="pl-title">最新评论</div>
        <comment-list :comments="commentInfo"></comment-list>
    </section>
  </main>
</template>

<script>
/***
 * 歌单详情组件
 */
import commentList from '@/common/comment-list/comment-list.vue';
import songList from "@/common/song-list/song-list.vue";
import { ref, onMounted, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchSongList, fetchSongListDynamic } from "@/api/song-list";
import { fetchPlayListComment } from '@/api/comment';
import { songListDetailDto } from "@/api/dto/song-list-dto";

export default {
  components: {
    songList,
    commentList
  },
  setup() {
    const router = useRouter();
    const routes = useRoute();
    const playlist = reactive({
      info: {}, // 歌单信息
      songs: [], // 歌单歌曲列表
      commentInfo: [], // 评论信息
      dynamicInfo: {} // 动态信息
    });
    const playListId = ref(routes.query.id);
    if (!playListId.value) {
      // 如果不存在歌单id 直接返回到上一级路由
      return router.back();
    }
    const loading = ref(true);
    onMounted(function () {
      const id = playListId.value;
      Promise.all([fetchSongListDynamic(id), fetchSongList(id), fetchPlayListComment(id)])
        .then(([dynamicInfo, playListInfo, commentInfo]) => {
            playlist.info = playListInfo.playlist;
            playlist.songs = songListDetailDto(playListInfo.playlist.tracks || []);
            playlist.commentInfo = commentInfo.comments;
            playlist.dynamicInfo = dynamicInfo;
        })
        .finally(() => {
            loading.value = false;
        });
    });

    return {
      loading,
      ...toRefs(playlist),
    };
  },
};
</script>

<style scoped lang="scss">
main {
  .playlist-cover-bg {
    display: flex;
    position: relative;
    padding: 30px 10px 30px 15px;
    background-size: contain;
    background-repeat: no-repeat;
    overflow: hidden;

    .cover-bg-blur {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      z-index: -1;
      transform: scale(1.5);
      filter: blur(20px);
    }

    .playlist-cover {
      border-radius: 7px;
      overflow: hidden;
      width: 126px;
      height: 126px;
      flex-shrink: 0;

      img {
        width: 100%;
        object-fit: cover;
        background: #ccc;
      }
    }

    .playlist-desc {
      overflow: hidden;
      margin-left: 10px;

      h2 {
        margin: 4px 0;
        color: #fff;
        font-size: 17px;
        font-weight: 400;
      }

      .playlist-author {
        margin-top: 20px;
      }

      .author-link {
        display: inline-block;
        max-height: 30px;
        color: hsla(0, 0%, 100%, 0.7);

        .author-avatar {
          width: 30px;
          object-fit: cover;
          border-radius: 50%;
        }

        .author-name {
          display: inline-block;
          vertical-align: 10px;
          margin-left: 8px;
          font-size: 14px;
        }
      }

      .playlist-short-desc {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-top: 4px;
        font-size: 12px;
        color: hsla(0, 0%, 100%, 0.7);
      }
    }
  }

  .pl-title {
    background-color: #eeeff0;
    color: #666;
    line-height: 23px;
    font-size: 12px;
    padding: 0 6px;
  }

  .review-comments {

  }
}
</style>
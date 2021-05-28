<template>
  <main>
    <template v-if="loading">
      <div class="loading-wrap">
        <loading-bar></loading-bar>
      </div>
    </template>
    <template v-else>
      <section class="playlist-cover-bg">
        <div class="playlist-cover">
          <div
            class="cover-bg-blur"
            :style="[{ 'background-image': `url(${info.coverImgUrl})` }]"
          ></div>
          <albumCover 
              :count="info.playCount" 
              :coverUrl="info.coverImgUrl"
          ></albumCover>
        </div>
        <div class="playlist-desc">
          <h2>{{ info.name }}</h2>
          <div class="playlist-author">
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
      <!--  热评列表    -->
      <section class="hot-comments" v-if="hotComments.length">
        <div class="pl-title">精彩评论</div>
        <comment-list :comments="hotComments"></comment-list>
      </section>
      <section class="review-comments" v-if="commentInfo.length">
        <!-- 评论列表区 -->
        <div class="pl-title">最新评论({{dynamicInfo.commentCount}})</div>
        <comment-list :comments="commentInfo"></comment-list>
      </section>
    </template>
  </main>
</template>

<script>
/***
 * 歌单详情组件
 * 点赞位置优化，查看播放详情页面优化
 */
import albumCover from "@/common/album-cover/album-cover.vue";
import commentList from "@/common/comment-list/comment-list.vue";
import songList from "@/common/song-list/song-list.vue";
import loadingBar from "@/common/loading/loading.vue";
import { ref, onMounted, reactive, toRefs, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchSongList, fetchSongListDynamic } from "@/api/song-list";
import { fetchPlayListComment, fetchHotComments } from "@/api/comment";
import { songListDetailDto } from "@/api/dto/song-list-dto";

export default {
  components: {
    songList,
    commentList,
    loadingBar,
    albumCover
  },
  setup() {
    const playlist = reactive({
      info: {}, // 歌单信息
      songs: [], // 歌单歌曲列表
      commentInfo: [], // 评论信息
      dynamicInfo: {}, // 动态信息
      hotComments: []
    });

    const routes = useRoute();
    const router = useRouter();
    const playListId = ref(routes.query.id);
    if (!playListId.value) {
      // 如果不存在歌单id 直接返回到上一级路由
      return router.back();
    }
    const loading = ref(true);
    onMounted(function () {
      const id = playListId.value;
      const TYPE_ID = 2;
      Promise.all([
        fetchSongListDynamic(id),
        fetchSongList(id),
        fetchPlayListComment(id),
        fetchHotComments(id, TYPE_ID)
      ])
        .then(([dynamicInfo, playListInfo, commentInfo, hotResult]) => {
          playlist.info = playListInfo.playlist;
          playlist.songs = songListDetailDto(playListInfo.playlist.tracks || []);
          playlist.commentInfo = commentInfo.comments;
          playlist.dynamicInfo = dynamicInfo;
          playlist.hotComments = hotResult.hotComments;
        })
        .finally(() => {
          loading.value = false;
        });
    });

    function scrollBottomHandler () {  
    }

    onBeforeMount(function () {
      // 移除鼠标监听事件，
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
  position: relative;

  .loading-wrap {
    height: 100vh;
    padding-top: 100px;
  }

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

  .cover-detail {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(20px);
    transform: scale(3);
  }
}
</style>

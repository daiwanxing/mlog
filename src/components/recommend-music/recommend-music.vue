<template>
  <section class="recommend-music">
    <template v-if="globalLoading">
      <i class="loading-bar"></i>
    </template>
    <template v-else>
      <div class="swiper-box">
        <!-- 轮播容器 -->
        <swiper
          v-if="bannerList.length && swiperVisible"
          loop
          autoplay
          :space-between="10"
          :disableOnInteraction="false"
          :initialSlide="swiperIndex"
          :pagination="{
            clickable: true,
            bulletActiveClass: 'net-bullet-active',
            bulletClass: 'net-bullet',
          }"
          @slideChange="swiperHandler"
        >
          <swiper-slide v-for="(item, index) in bannerList" :key="index">
            <img
              :src="item.imageUrl"
              :alt="item.typeTitle"
              class="swiper-image"
            />
          </swiper-slide>
        </swiper>
      </div>
      <!-- 推荐歌单 -->
      <section class="song-list-group">
        <h3 class="sub-title">推荐歌单</h3>
        <div class="song-list-box">
          <a
              class="song-list"
               v-for="item in songList"
               :key="item.id"
              :href="'/playlist?id='+ item.id"
              :data-playcount="translatorToMillon(item.playCount)"
          >
            <img :src="item.picUrl" alt="item.name" class="song-list-image" />
            <div class="song-list-title">{{ item.name }}</div>
          </a>
        </div>
      </section>
      <!-- 最新音乐 -->
      <section class="new-music-group">
        <h3 class="sub-title">最新音乐</h3>
        <template v-if="false">
          <error-page @retry="getMusicList"></error-page>
        </template>
        <template v-else>
          <div class="new-music-box">
            <div class="new-music-list">
              <a
                class="new-music-item"
                v-for="item in newMusic"
                :key="item.id"
                :href="`/song/${item.id}`"
              >
                <h3 class="music-title">
                  {{ item.song.name + item.song.alias }}
                </h3>
                <p class="music-creator">{{ item.song.artists[0].name }}</p>
              </a>
            </div>
          </div>
        </template>
      </section>
    </template>
  </section>
</template>

<script>
import { fetchBanner, fetchSongList, fetchNewMusic } from "@/api/index";
import { installSwiperModule } from "@/useSetup/useSwiper.js";
import { reactive, toRefs, ref, onActivated, onDeactivated } from "vue";
import errorPage from "@/common/error-page/error-page.vue";
import { translatorToMillon } from '@/utils/util';

// TODO 1. 最新音乐添加Loading, 推荐歌单和banner图区域添加loading，
// TODO 2. 完善推荐音乐底部 footer 样式，歌单播放数量展示, 歌单容器用a标签展示
// 4/20 3. 开发搜索页面
// 4/21 4. 开发热歌榜

export default {
  name: "recommend-music",
  components: {
    ...installSwiperModule(),
    errorPage,
  },
  setup() {
    const requestError = ref(false);
    const globalLoading = ref(false); // 全局loading
    const data = reactive({
      newMusic: [], // 推荐新音乐
      bannerList: [], // 首页轮播图列表
      songList: [], // 推荐歌单列表
    });
    let swiperVisible = ref(true); // 轮播容器是否显示
    let swiperIndex = ref(0); // 记住当前的轮播索引

    globalLoading.value = true;
    Promise.all([fetchBanner(), fetchSongList(6)])
      .then(([{ banners }, { result }]) => {
        data.bannerList = banners;
        data.songList = result;
      })
      .catch((error) => {
        console.error(error);
        requestError.value = true;
      })
      .finally(() => {
        globalLoading.value = false;
      });

    getMusicList();
    function getMusicList() {
      fetchNewMusic()
        .then(({ result: newMusic = [] }) => {
          data.newMusic = newMusic;
        });
    }

    // 每次滑动，记录当前的轮播图的索引，当组件激活时，快速定位到上次轮播的位置
    function swiperHandler(data) {
      swiperIndex.value = data.realIndex;
    }
    // 组件失活时，销毁swiper
    onDeactivated(function () {
      swiperVisible.value = false;
    });
    onActivated(function () {
      swiperVisible.value = true;
    });

    return {
      globalLoading,
      swiperVisible,
      swiperHandler,
      swiperIndex,
      getMusicList,
      ...toRefs(data),
      translatorToMillon
    };
  },
};
</script>

<style lang="scss">
.swiper-box {
  padding: 10px;
  box-sizing: border-box;

  .swiper-image {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .net-bullet-active.net-bullet {
    background-color: var(--mainTheme);
  }

  .net-bullet {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.3);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 4px;
  }
}
</style>
<style scoped lang="scss">
.recommend-music {
  .sub-title {
    font-size: 17px;
    padding-left: 10px;
    position: relative;
    font-weight: 400;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background-color: var(--mainTheme);
    }
  }

  .song-list-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .song-list {
    width: 33%;
    box-sizing: border-box;
    margin-bottom: 14px;
    position: relative;

      &::after {
        content: attr(data-playcount);
        position: absolute;
        right: 4px;
        top: 4px;
        padding-left: 14px;
        color: #fff;
        font-size: 10px;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+") no-repeat;
        background-size: 11px;
        background-position-y: 2px;
      }

    .song-list-image {
      width: 100%;
    }

    .song-list-title {
      display: -webkit-box;
      overflow: hidden;
      color: #333;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      font-size: 13px;
    }
  }

  .new-music-box {
    padding: 0 10px;
  }

  .new-music-item {
    display: block;
    padding: 4px 42px 4px 0;
    box-sizing: border-box;
    position: relative;
    color: #333;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 22px;
      height: 22px;
      padding: 0 5px;
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
        no-repeat -24px 0 / 166px 97px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #efeff0;
    }

    .music-title {
      overflow: hidden;
      margin: 0;
      font-size: 16px;
      line-height: 26px;
      font-weight: 400;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .music-creator {
      margin: 0;
      line-height: 22px;
      color: #888;
      font-size: 14px;
    }
  }

  .loading-bar {
    display: block;
    padding: 50px 0;
    height: 20px;
    background: url("data:image/gif;base64,R0lGODlhKAAoAIABANM6Mf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2QURFODRFRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2QURFODRGRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZBREU4NENGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZBREU4NERGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgABACwAAAAAKAAoAAACeIyPqcvtD6OctNoD8rUZ7Np9VChKZAmdqKOuTOsqcIzMtGHfuaxxfbRrBGu/UfExXCRxxwRsGdg9m0IqpgmVYq1KbnTrMXmnYeAYzCtf1em2E11lf+VkFpxIP+f37td93dfF9zboVwhIaHfItJjoiBd4IzlJWalQAAAh+QQJCgABACwAAAAAKAAoAAACfIyPqcvtD6OctNqLs94WeB55AAiJ5GOeTaoubJu8nBzQGm0zuYF/0l7zIYAxocvIQzqAvVHROVRGoYemgqm0PpfZLjX53YqnV2nVWw5j1ejxkQ1Pc+Nu8FxeD4bJea2uzRf4hidotwJ4RvenmEg42IfoaFioB2N5iZmZUAAAIfkECQoAAQAsAAAAACgAKAAAAn+Mj6nL7Q+jnLRaCPK1GezafVTIaRIJmhE6qpg7sY98wg692g3+egnNm9mAup6C6EslD8hL8zcsGp4I6sI6jS6PWu42EAR3od8wVlyWor1s8m1chV/l2fQ3bm/j33m3n3F2tvfHREdYp1d4p5iIePgYqBbZB2goKIKZqbnJ+VAAACH5BAUKAAEALAAAAAAoACgAAAJ8jI+py+0PIwRUWkbB3Sjz731bKFpkGZ1mJaktm8KX29CT/Ng57ug9XwPeNC/iSLjwBY1DEFKhxDwTLl/0UH1eDVkmlNf9eqng8thqFquX606aTT6/pfJ6OznH5u/cfQBtF8cnSOgWSDcYBmeYqOWniFiod4hSaXmJmWlRAAA7")
      no-repeat center;
    background-size: 20px;
  }
}
</style>

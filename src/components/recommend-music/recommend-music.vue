<template>
  <section class="recommend-music">
    <template v-if="globalLoading">
      <loading-bar></loading-bar>
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
            <img :src="item.picUrl" :alt="item.name" class="song-list-image" />
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
import errorPage from "@/common/error-page/error-page.vue";
import loadingBar from '@/common/loading/loading.vue';
import { fetchBanner, fetchSongList, fetchNewMusic } from "@/api/index";
import { installSwiperModule } from "@/useSetup/useSwiper.js";
import { reactive, toRefs, ref, onActivated, onDeactivated } from "vue";
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
    loadingBar
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
        background: var(--icon-earphone) no-repeat;
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
}
</style>

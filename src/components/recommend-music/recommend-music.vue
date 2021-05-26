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
          :lazy="{ loadPrevNext: true }"
          :space-between="10"
          :disableOnInteraction="false"
          :initialSlide="swiperIndex"
          :pagination="{
            clickable: true,
            bulletActiveClass: 'net-bullet-active',
            bulletClass: 'net-bullet',
          }"
          class="custom-swiper-box"
          @slideChange="swiperHandler"
        >
          <swiper-slide
            v-for="(item, index) in bannerList"
            :key="index"
            class="custom-swiper-slide"
          >
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
        <h3 class="sub-title">编辑推荐</h3>
        <div class="song-list-box">
          <router-link
            class="song-list"
            v-for="item in songList"
            :key="item.id"
            :to="'/mlog/playlist?id=' + item.id"
          >
            <albumCover
              :coverUrl="item.picUrl"
              :count="item.playCount"
              >{{ item.name }}
            </albumCover>
          </router-link>
        </div>
      </section>
      <!-- 最新音乐 -->
      <section class="new-music-group">
        <h3 class="sub-title">最新音乐</h3>
        <template v-if="false">
          <error-page @retry="getMusicList"></error-page>
        </template>
        <template v-else>
          <song-list :songs="newMusicList"></song-list>
        </template>
      </section>
    </template>
  </section>
</template>

<script>
import albumCover from "@/common/album-cover/album-cover.vue";
import songList from "@/common/song-list/song-list.vue";
import errorPage from "@/common/error-page/error-page.vue";
import loadingBar from "@/common/loading/loading.vue";
import { fetchBanner, fetchSongList, fetchNewMusic } from "@/api/index";
import { installSwiperModule } from "@/useComposition/useSwiper.js";
import {
  reactive,
  toRefs,
  ref,
  onActivated,
  onDeactivated,
  computed,
} from "vue";


export default {
  name: "recommend-music",
  components: {
    albumCover,
    songList,
    ...installSwiperModule(),
    errorPage,
    loadingBar,
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
      fetchNewMusic().then(({ result: newMusic = [] }) => {
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

    const newMusicList = computed(() => data.newMusic.map((item) => item.song));

    return {
      newMusicList,
      globalLoading,
      swiperVisible,
      swiperHandler,
      swiperIndex,
      getMusicList,
      ...toRefs(data)
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
  }
}
</style>

<template>
  <section class="recommend-music">
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
        <div 
            class="song-list" 
            v-for="item in songList"
            :key="item.id"
          >
            <img :src="item.picUrl" alt="item.name" class="song-list-image">
            <div class="song-list-title">{{item.name}}</div>
        </div> 
      </div>
    </section>
    <!-- 最新音乐 -->
    <section class="new-music-group">
      <h3 class="sub-title">最新音乐</h3>
      <div class="new-music-item">

      </div>
    </section>
  </section>
</template>

<script>
import { fetchBanner, fetchSongList, fetchNewMusic } from "@/api/index";
import { installSwiperModule } from "@/useSetup/useSwiper.js";
import { reactive, toRefs, ref, onActivated, onDeactivated } from "vue";

export default {
  name: "recommend-music",
  components: {
    ...installSwiperModule(),
  },
  setup() {
    const data = reactive({
      newMusic: [], // 推荐新音乐
      bannerList: [], // 首页轮播图列表
      songList: [], // 推荐歌单列表
    });
    let swiperVisible = ref(true); // 轮播容器是否显示
    let swiperIndex = ref(0); // 记住当前的轮播索引

    fetchBanner().then(({ banners = []}) => {
      data.bannerList = banners;
    });
    fetchSongList(6).then(({ result: songList = [] }) => {
       data.songList = songList;
    });
    fetchNewMusic().then(({ result: newMusic = [] }) => {
       data.newMusic = newMusic;
    });   

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
      swiperVisible,
      swiperHandler,
      swiperIndex,
      ...toRefs(data),
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

      .song-list-image {
          width: 100%;
      }

      .song-list-title {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          font-size: 14px;
      }
  }
}
</style>
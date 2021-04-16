<template>
  <section class="recommend-music">
    <div class="swiper-box">
      <!-- 轮播容器 -->
      <swiper
        v-if="bannerList.length && swiperVisible"
        loop
        :space-between="10"
        :initialSlide="swiperIndex"
        autoplay
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
    <section class="song-push"></section>
    <!-- 最新音乐 -->
    <section class="new-song-album"></section>
  </section>
</template>

<script>
import { fetchBanner } from "@/api/index";
import { installSwiperModule } from "@/useSetup/useSwiper.js";
import { reactive, toRefs, ref, onActivated, onDeactivated } from "vue";

export default {
  name: "recommend-music",
  components: {
    ...installSwiperModule(),
  },
  setup() {
    const data = reactive({
      bannerList: [],
    });
    let swiperVisible = ref(true); // 轮播容器是否显示
    let swiperIndex = ref(0); // 记住当前的轮播索引

    fetchBanner().then((result) => {
       data.bannerList = result.banners || [];
    });

    function swiperHandler (data) {
        swiperIndex.value = data.realIndex;
    }

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
}
</style>
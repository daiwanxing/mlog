<template>
  <section class="recommend-music">
    <div class="swiper-box">
      <!-- 轮播容器 -->
         <div class="swiper-group">
          <swiper
              style="height: 150px"
              autoplay
              loop
              :pagination="{ clickable: true, bulletActiveClass: 'net-bullet-active', bulletClass: 'net-bullet' }"
          >
            <swiper-slide
                v-for="(item, index) in bannerList"
                :key="index"
            >
              <img :src="item.imageUrl" :alt="item.typeTitle" class="swiper-image">
            </swiper-slide>
          </swiper>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <section class="song-push"></section>
    <!-- 最新音乐 -->
    <section class="new-song-album"></section>
  </section>
</template>

<script>
import { fetchBanner } from '@/api/index';
import { installSwiperModule } from "@/useSetup/useSwiper.js";
import { reactive, toRefs } from 'vue';

export default {
  name: "recommend-music",
  components: {
    ...installSwiperModule(),
  },
  setup() {
    const data = reactive({
        bannerList: null
    });
    fetchBanner().then(result => {
        data.bannerList = result.banners || [];
    });

      return {
          ...toRefs(data)
      }
  },
};
</script>

<style lang="scss">
.swiper-group {
  .swiper-image {
    width: 100%;
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
.recommend-music {}
</style>
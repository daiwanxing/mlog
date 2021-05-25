<template>
  <div class="album-cover" :data-playCount="translatorToMillon(count)">
    <div :class="['cover-image-wrap', { hasImg: isLoaded }]">
        <img 
            :src="coverUrl" 
            class="album-cover-image" 
            :style="{height: imageWidth + 'px'}" 
            @load="isLoaded = true"
        />
    </div>
    <div class="album-title">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from "vue";
import { translatorToMillon } from "@/utils/util";
import { debounce } from "lodash-es";

export default {
  props: {
    coverUrl: String, // 封面
    count: {
      type: [Number, String],
      default: 0,
    }, // 播放次数
  },
  setup() {
    // 监听resize事件，每200毫秒
    let isLoaded = ref(false); // 图片是否已经加载完毕
    let imageWidth = ref(window.innerWidth * 0.33); // 每张图片的宽度,对应的高度也是如此

    let debounceResizeImageHandler = debounce(function () {
        imageWidth.value = window.innerWidth * 0.33;
    }, 200);

    window.addEventListener("resize",  debounceResizeImageHandler);

    onBeforeUnmount(() => {
      window.removeEventListener("resize", debounceResizeImageHandler);
    });



    return {
      translatorToMillon,
      imageWidth,
      isLoaded
    }
  },
};
</script>

<style scoped lang="scss">

@keyframes opacityLoad {
    0% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
}

.album-cover {
  position: relative;

  &::after {
    content: attr(data-playcount);
    position: absolute;
    right: 0px;
    top: 0px;
    height: 18px;
    line-height: 18px;
    padding-left: 14px;
    color: #fff;
    font-size: 10px;
    background: var(--icon-earphone) no-repeat;
    background-size: 10px;
    background-position-y: 4px;
  }

  .cover-image-wrap:not(.hasImg) {
      background-color: #e2e2e2;
      animation: opacityLoad 2s ease-in infinite;
  }

  .album-cover-image {
    width: 100%;
    object-fit: cover;
  }

  .album-title {
    display: -webkit-box;
    overflow: hidden;
    color: #333;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    font-size: 13px;
  }
}
</style>

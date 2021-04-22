<template>
  <div class="suggest-box">
    <p class="suggest-words" @click="$emit('searchHandler', searchWords)">
      搜索"{{ searchWords }}"
    </p>
    <loading-bar v-if="loading"></loading-bar>
    <ul class="suggest-result" 
        v-else
    >
      <li
        class="suggest-result-item"
        v-for="(item, index) in suggestSong"
        :key="index"
        @click="$emit('searchHandler', item.keyword)"
      >
        {{ item.keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
import { toRefs } from "vue";
import loadingBar from "@/common/loading/loading.vue";

export default {
  name: "suggest-result",
  components: {
      loadingBar
  },
  props: {
    searchWords: {
      type: String,
      default: "",
    },
    suggestSong: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: {
        type: Boolean,
        default: false
    }
  },
  setup(props) {
    return {
        ...toRefs(props)
    };
  },
};
</script>

<style scoped lang="scss">
.suggest-box {
  .suggest-result {
    margin: 0;
  }

  .suggest-result-item {
    position: relative;
    line-height: 44px;
    font-size: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &::before {
      content: "";
      position: absolute;
      left: -40px;
      top: 0;
      width: 40px;
      height: 100%;
      background: var(--icon-loupe);
      background-repeat: no-repeat;
      background-size: 13px;
      background-position: center;
    }
  }

  .suggest-words {
    color: #507daf;
    padding: 10px;
    margin: 0 0 0 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
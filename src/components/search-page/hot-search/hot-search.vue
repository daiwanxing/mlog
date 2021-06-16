<template>
  <div class="hot-search-box">
    <span class="hot-search-title">热门搜索</span>
    <template v-if="loading">
      <loading></loading>
    </template>
    <template v-else>
      <div
        class="hot-search-chip"
        v-for="(item, index) in hotList.hots"
        :key="index"
        @click="hotSelectHandler(item.first, $emit)"
      >
        {{ item.first }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import loading from "@/common/loading/loading.vue";
import { fetchHotList, hotSelectHandler } from "@/useComposition/useHotSearch";

export default {
  components: {
    loading
  },
  setup() {
    const { loading, hotList } = fetchHotList();

    return {
      hotList,
      loading,
      hotSelectHandler
    };
  },
};
</script>

<style scoped lang="scss">
.hot-search-box {
  padding: 15px 10px;

  .hot-search-title {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
  }

  .hot-search-chip {
    display: inline-block;
    margin: 0 8px 8px 0;
    padding: 0 14px;
    line-height: 30px;
    border-radius: 30px;
    font-size: 13px;
    border: 1px solid #d3d4da;
  }
}
</style>
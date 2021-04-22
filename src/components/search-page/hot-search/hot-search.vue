<template>
  <div class="hot-search-box">
    <!-- 热门搜索 -->
    <span class="hot-search-title">热门搜索</span>
    <div
      class="hot-search-chip"
      v-for="(item, index) in hotList.hots"
      :key="index"
      @click="hotSelectHandler(item.first, $emit)"
    >
      {{ item.first }}
    </div>
  </div>
</template>

<script>
// 热搜组件：职责，获取热搜列表数据并展示 done
// 2. 点击热搜项， emit 给 历史记录组件，存入到历史记录， 告诉父组件，搜索音乐
import { fetchHotList, hotSelectHandler } from "@/useComposition/useHotSearch";
import { ref } from "vue";

export default {
  setup() {
    const hotList = ref([]); // 热搜列表
    fetchHotList(hotList);

    return {
      hotList,
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
<template>
  <section class="search-box">
    <div class="search-input">
      <div class="search-wrap">
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model.trim="searchKey"
          @keyup.enter="searchSongHandler(searchKey)"
          @input="updateSuggest"
          @compositionstart="chinesePrinterStart"
          @compositionend="chinesePrinterEnd"
        />
        <transition
          enter-active-class="animate__zoomIn animate__faster"
          leave-active-class="animate__zoomOut animate__faster"
        >
          <i
            class="cancel-search animate__animated"
            @click="searchKey = ''"
            v-if="searchKey"
          ></i>
        </transition>
      </div>
    </div>
    <template v-if="searchKey">
      <suggest-search
        v-if="suggestState"
        :searchWords="searchKey"
        :suggestSong="suggestList"
        :loading="loadingState"
        @searchHandler="searchSongHandler"
      />
      <search-result
        v-if="searchState"
        :loading="loadingState"
        :songs="searchList"
      ></search-result>
    </template>
    <template v-else>
      <!-- 热搜列表 -->
      <hot-search @searchHandler="searchSongHandler"></hot-search>
    </template>
    <!-- 搜索历史 -->
    <history-record
      @searchHandler="searchSongHandler"
      v-show="!searchKey"
    ></history-record>
  </section>
</template>

<script>
import hotSearch from "./hot-search/hot-search.vue";
import historyRecord from "./history-record/history-record.vue";
import searchResult from "./search-result/search-result.vue";
import suggestSearch from "./suggest-result/suggest-result.vue";
import loading from "@/common/loading/loading.vue";
import mitt, { MESSAGE_CONSTANTS } from "@/utils/mitt";
import { ref } from "vue";
import { debounce } from "lodash-es";
import { useSearch, seachSongHandler, suggestSearchHandler } from "@/composables/useSearch";

export default {
  name: "search-page",
  components: {
    loading,
    suggestSearch,
    searchResult,
    historyRecord,
    hotSearch,
  },
  setup() {
    const { searchKey, suggestList, searchList, loadingState } = useSearch();
    let fetchSuggFlag = true; // 是否可以调用建议搜索接口
    const suggestState = ref(false); // 建议态
    const searchState = ref(false); // 搜索态
    const searchSuggestHandler = debounce(suggestSearchHandler, 200);

    function updateSuggest() {
      if (fetchSuggFlag) {
        suggestList.value = [];
        searchState.value = false; // 搜索态关闭
        suggestState.value = true; // 建议态开启
        searchKey.value && searchSuggestHandler();
      }
    }

    function searchSongHandler(data) {
      if (data) {
        mitt.emit(MESSAGE_CONSTANTS.ADD_HISTORY, data);
        suggestState.value = false; // 建议态关闭
        searchState.value = true; // 搜索态开启
        searchKey.value = data;
        searchList.value = [];
        seachSongHandler();
      }
    }

    // 合成器事件监听
    function chinesePrinterStart() {
      fetchSuggFlag = false;
    }

    function chinesePrinterEnd() {
      fetchSuggFlag = true;
      updateSuggest();
    }

    return {
      suggestState,
      loadingState,
      searchState,
      searchKey,
      searchSongHandler,
      updateSuggest,
      chinesePrinterStart,
      chinesePrinterEnd,
      suggestList,
      searchList
    };
  },
};
</script>

<style scoped lang="scss">
// https://github.com/vuejs/rfcs/pull/231

.search-box {
  .search-input {
    padding: 15px 10px;
    border-bottom: 1px solid #ececec;

    .search-wrap {
      position: relative;
      padding: 0 30px;
      background-color: #ececec;
      border-radius: 30px;

      /* 搜索框 */
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 30px;
        height: 100%;
        background: var(--icon-loupe);
        background-repeat: no-repeat;
        background-size: 13px;
        background-position: center;
      }

      .cancel-search {
        position: absolute;
        right: 0;
        width: 30px;
        height: 100%;
        background: var(--icon-close);
        background-repeat: no-repeat;
        background-size: 13px;
        background-position: center;
      }
    }

    // input标签不支持伪类
    input {
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      outline: none;
      border: none;
      background-color: #ececec;
      font-size: 14px;
    }

    input::-webkit-input-placeholder {
      font-size: 14px;
      color: #cfcfcf;
    }
  }
}
</style>
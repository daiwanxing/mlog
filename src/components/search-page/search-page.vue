<template>
  <section class="search-box">
    <div class="search-input">
      <div class="search-wrap">
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model.trim="searchKeyWords"
          @keyup.enter="searchSongHandler(searchKeyWords)"
          @input="updateSuggest"
        />
        <transition
          enter-active-class="animate__zoomIn animate__faster"
          leave-active-class="animate__zoomOut animate__faster"
        >
          <i
            class="cancel-search animate__animated"
            @click="searchKeyWords = ''"
            v-if="searchKeyWords"
          ></i>
        </transition>
      </div>
    </div>
    <template v-if="searchKeyWords">
      <suggest-search
        v-if="suggestState"
        :searchWords="searchKeyWords"
        :suggestSong="suggestSong"
        :loading="loading"
        @searchHandler="searchSongHandler"
      />
      <search-result
        v-if="searchState"
        :loading="loading"
        :songs="songList"
      ></search-result>
    </template>
    <template v-else>
      <!-- 热搜列表 -->
      <hot-search @searchHandler="searchSongHandler"></hot-search>
      <!-- 搜索历史 -->
      <history-record @searchHandler="searchSongHandler"></history-record>
    </template>
  </section>
</template>

<script>
import hotSearch from "./hot-search/hot-search.vue";
import historyRecord from "./history-record/history-record.vue";
import searchResult from "./search-result/search-result.vue";
import suggestSearch from "./suggest-result/suggest-result.vue";
import loading from "@/common/loading/loading.vue";
import { ref, reactive, toRefs } from "vue";
import { debounce } from "lodash-es";
import { fetchSearchSuggest, fetchSearch } from "@/api/index";
import mitt, { MESSAGE_CONSTANTS } from '@/utils/mitt';

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
    const data = reactive({
      songList: [], // 搜索结果列表
      suggestSong: [], // 搜索建议列表
    });

    const searchKeyWords = ref(""); // 要搜索的关键字
    const loading = ref(false); // 加载状态

    const suggestState = ref(false); // 建议态
    const searchSuggestHandler = debounce(function () {
      loading.value = true;
      fetchSearchSuggest(searchKeyWords.value)
        .then(({ result }) => {
          data.suggestSong = result.allMatch || [];
        })
        .finally(function () {
          loading.value = false;
        });
    }, 200);

    const searchState = ref(false); // 搜索态
    function searchByWords() {
      loading.value = true;
      data.songList = [];
      const songName = searchKeyWords.value;;
      fetchSearch(songName)
        .then(({ result }) => {
          data.songList = result.songs;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          loading.value = false;
        });
    }

    function updateSuggest() {
      data.suggestSong = [];
      searchState.value = false; // 搜索态关闭
      suggestState.value = true; // 建议态开启
      searchSuggestHandler();
    }

    function searchSongHandler(data) {
       if (data) {
         mitt.emit(MESSAGE_CONSTANTS.ADD_HISTORY, data);
         suggestState.value = false; // 建议态关闭
         searchState.value = true; // 搜索态开启
         searchKeyWords.value = data;
         searchByWords();
       }
    }

    return {
      suggestState,
      loading,
      searchState,
      searchKeyWords,
      searchSongHandler,
      updateSuggest,
      ...toRefs(data),
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
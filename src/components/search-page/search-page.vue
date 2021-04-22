<template>
  <section class="search-box">
    <div class="search-input">
      <div class="search-wrap">
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model.trim="searchKeyWords"
          @keyup.enter="searchByWords"
          @focus="focusHandler"
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
        :searchWords="searchKeyWords"
        :suggestSong="suggestSong"
        :loading="loading"
        @searchHandler="searchByWords"
      />
    </template>
    <template v-else>
      <!-- 热搜列表 -->
      <hot-search></hot-search>
      <!-- 搜索历史 -->
      <history-record></history-record>
    </template>
  </section>
</template>

<script>
import hotSearch from './hot-search/hot-search.vue';
import historyRecord from './history-record/history-record.vue';
import searchResult from "./search-result/search-result.vue";
import suggestSearch from "./suggest-result/suggest-result.vue";
import loading from "@/common/loading/loading.vue";
import { ref, reactive, toRefs } from "vue";
import { debounce } from "lodash-es";
import { fetchSearchSuggest, fetchSearch } from "@/api/index";

// 未主动搜索： 如果有搜索关键字，展示搜索建议列表
// 主动搜索，关闭搜索建议列表，关闭历史记录列表
// input控件获取焦点事件，清空搜索结果列表

export default {
  name: "search-page",
  components: {
    loading,
    suggestSearch,
    searchResult,
    historyRecord,
    hotSearch
  },
  setup() {
    const data = reactive({
      songList: [], // 搜索结果列表
      suggestSong: [] // 搜索建议列表
    });

    const searchKeyWords = ref(""); // 要搜索的关键字
    const loading = ref(false); // 加载状态
    // 搜索建议
    const searchSuggestHandler = debounce(function () {
      // 根据用户输入的关键字联想搜索建议
      loading.value = true;
      fetchSearchSuggest(searchKeyWords.value)
        .then(({ result }) => {
          data.suggestSong = result.allMatch || [];
        })
        .finally(function () {
          loading.value = false;
        });
    }, 200);

    // 两种状态， 建议搜索态， 主动搜索态
    // suggestSearch searchResult 切换两个组件得展示
    const searchState = ref(false); // 页面是否正处于搜索状态
    const suggestState = ref(false); // 建议态
    function searchByWords(searchName = null) {
      searchState.value = true;
      const songName =
        typeof searchName === "string" ? searchName : searchKeyWords.value;
      fetchSearch(songName)
        .then(({ result }) => {
          data.songList = result.songs;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          searchState.value = false;
        });
    }

    function focusHandler() {
      // 这是一个心智负担，每当我定义一个模板需要用到的方法或者变量，我必须得时刻记住要return
      data.songList = [];
    }

    function suggestButton (song) {
      searchKeyWords.value = song;
      searchByWords();
    }

    function updateSuggest () {
        data.suggestSong.splice(0);
        searchSuggestHandler();
    }

    return {
      suggestButton,
      focusHandler,
      loading,
      searchState,
      searchKeyWords,
      searchByWords,
      searchSuggestHandler,
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
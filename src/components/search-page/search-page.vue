<template>
  <section class="search-box">
    <div class="search-input">
      <div class="search-wrap">
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model.trim="searchKeyWords"
          @input="searchSuggestHandler"
          @keyup.enter="searchByWords"
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
      <!-- 搜索建议列表 -->
      <p class="suggest-words">搜索"{{ searchKeyWords }}"</p>
      <loading v-if="loading"></loading>
      <!-- 显示建议列表 / 歌单列表 -->
      <ul class="suggest-group">
        <li
          class="suggest-item"
          v-for="(item, index) in suggestSong"
          :key="index"
        >
          {{ item.keyword }}
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="hot-search">
        <!-- 热门搜索 -->
        <span class="hot-search-title">热门搜索</span>
        <div
          class="hot-search-chip"
          v-for="(item, index) in hotSearchList.hots"
          :key="index"
          @click="searchKeyWords = item.first"
        >
          {{ item.first }}
        </div>
      </div>
      <!-- 搜索历史 -->
      <div class="history-search">
         <ul class="his-search-group suggest-group">
           <li v-for="(item, index) in historySl" :key="index" class="suggest-item history-chip">
             {{item}}
             <i class="del-button-outline" @click="delSearchHistory(item)"></i>
            </li>
         </ul>
      </div>
    </template>
  </section>
</template>

<script>
import loading from "@/common/loading/loading.vue";
import { ref, reactive, toRefs } from "vue";
import { debounce } from "lodash-es";
import { fetchSearchSuggest, fetchHotSearch, fetchSearch } from "@/api/index";
import { getStorage, setStorage } from "@/utils/util";

export default {
  name: "search-page",
  components: {
    loading,
  },
  setup() {
    const data = reactive({
      songList: [], // 搜索结果列表
      suggestSong: [], // 搜索建议列表
      historySl: [], // 历史搜索列表
      hotSearchList: [], // 热搜列表
    });

    data.historySl = getStorage("historySl", []); // 获取历史搜索记录
    const searchKeyWords = ref(""); // 要搜索的关键字
    const loading = ref(false); // 加载状态
    // 搜索建议
    const searchSuggestHandler = debounce(function () {
      if (searchKeyWords.value) {
        // 根据用户输入的关键字联想搜索建议
        data.suggestSong.splice(0);
        loading.value = true;
        fetchSearchSuggest(searchKeyWords.value)
          .then(({ result }) => {
            data.suggestSong = result.allMatch || [];
          })
          .finally(function () {
            loading.value = false;
          });
      } else {
        data.suggestSong = [];
      }
    }, 200);

    hotSearch();
    // 获取热搜榜
    function hotSearch() {
      fetchHotSearch()
        .then(({ result }) => {
          data.hotSearchList = result;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }

    const searchState = ref(false); // 页面是否正处于搜索状态
    function searchByWords() {
      loading.value = true;
      const songName = searchKeyWords.value;
      if (!data.historySl.includes(songName)) {
          data.historySl.push(songName); // 存入到历史搜索记录中
      }
      fetchSearch(songName)
        .then((result) => {
          setStorage("historySl", data.historySl);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          loading.value = false;
        });
    }

    // 删除历史搜索记录
    function delSearchHistory (msg) {
        const delIdx = data.historySl.findIndex(item => item === msg);
        if (delIdx > -1) {
          data.historySl.splice(delIdx, 1);
          setStorage("historySl", data.historySl);
        }
    }

    return {
      loading,
      searchKeyWords,
      searchByWords,
      searchSuggestHandler,
      delSearchHistory,
      ...toRefs(data),
    };
  },
};
</script>

<style scoped lang="scss">
// https://github.com/vuejs/rfcs/pull/231
@mixin border-bottom-light {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

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

  .suggest-words {
    color: #507daf;
    padding: 10px;
    margin: 0 0 0 10px;
    @include border-bottom-light;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hot-search {
    padding: 15px 10px;

    .hot-search-title {
      color: #666;
      font-size: 12px;
      display: block;
      margin-bottom: 10px;
    }

    .hot-search-chip {
      display: inline-block;
      padding: 0 14px;
      line-height: 30px;
      border: 1px solid #d3d4da;
      border-radius: 30px;
      font-size: 13px;
      margin: 0 8px 8px 0;
    }
  }

  .suggest-group {
    margin: 0;
  }

  .suggest-item {
    position: relative;
    line-height: 44px;
    font-size: 14px;
    @include border-bottom-light;

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

  .history-chip::before {
    background-image: var(--icon-clock);
  }

  .history-chip {
    position: relative;
  }

  .del-button-outline {
    position: absolute;
    right: 0;
    width: 40px;
    height: 100%;
    background: var(--icon-del-lined) no-repeat center;
    background-size: 12px;
  }
}
</style>
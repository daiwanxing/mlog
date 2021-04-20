<template>
  <section class="search-box">
    <div class="search-input">
      <div class="search-wrap">
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model.trim="searchKeyWords"
          @input="searchHandler"
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
      <p class="suggest-words">搜索"{{searchKeyWords}}"</p>
      <ul>
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
      <div class="history-search"></div>
    </template>
  </section>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { debounce } from "lodash-es";
import { fetchSearchSuggest, fetchHotSearch } from "@/api/index";

export default {
  name: "search-page",
  setup() {
    let data = reactive({
      suggestSong: [], // 联想列表
      historySl: [], // 历史搜索列表
      hotSearchList: [], // 热搜列表
    });
    data.historySl = JSON.parse(localStorage.getItem("histroySl")) || []; // 获取历史搜索记录
    const searchKeyWords = ref(""); // 搜索关键字
    const searchHandler = debounce(function () {
      if (searchKeyWords.value) {
        // data.historySl.push(searchKeyWords.value); // 存入到历史搜索记录中
        // 根据用户输入的关键字联想搜索建议
        fetchSearchSuggest(searchKeyWords.value)
          .then(({ result }) => {
            data.suggestSong = result.allMatch || [];
          })
          .finally(function () {
            //  localStorage.setItem("histroySl", JSON.stringify(data.historySl));
          });
      } else {
        data.suggestSong = [];
      }
    }, 200);

    hotSearch();
    // 热搜榜
    function hotSearch() {
      fetchHotSearch()
        .then(({ result }) => {
          data.hotSearchList = result;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      searchKeyWords,
      searchHandler,
      ...toRefs(data),
    };
  },
};
</script>

<style scoped lang="scss">
@mixin border-bottom-light {
  border-bottom: 1px solid rgba(0,0,0,.1);
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
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
        background-repeat: no-repeat;
        background-size: 13px;
        background-position: center;
      }

      .cancel-search {
        position: absolute;
        right: 0;
        width: 30px;
        height: 100%;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==");
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
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
      background-repeat: no-repeat;
      background-size: 13px;
      background-position: center;
    }
  }
}
</style>
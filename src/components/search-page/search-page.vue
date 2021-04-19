<template>
  <section class="search-box">
    <div class="search-input">
      <div class="search-wrap">
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model.trim="searchKeyWords"
          class="animate__zoomIn"
        />
        <transition 
            enter-active-class="animate__animated animate__zoomIn animate__faster"
            leave-active-class="animate__animated animate__zoomOut animate__faster"
        >
            <i 
                class="cancel-search animate__animated" 
                @click="searchKeyWords = ''"
                v-if="searchKeyWords"
            ></i>
        </transition>
      </div>
    </div>
    <div class="hot-search">
      <!-- 热门搜索 -->
      <div class="hot-search-chip"></div>
    </div>
    <!-- 搜索历史 -->
    <div class="history-search"></div>
  </section>
</template>

<script>
import { ref } from "vue";
import { throttle } from "lodash-es";
import { searchSuggest } from "@/api/index";

export default {
  name: "search-page",
  setup() {
    const searchKeyWords = ref(""); // 搜索关键字

    // 根据用户输入的关键字联想搜索建议
    const searchHandler = throttle(function () {
      if (searchKeyWords.value) {
        searchSuggest(searchKeyWords.value).then((result) => {
          console.log(result);
        });
      }
    }, 300);

    return {
      searchKeyWords,
      searchHandler,
    };
  },
};
</script>

<style scoped lang="scss">
.search-box {
  border-bottom: 1px solid #ececec;
  .search-input {
    padding: 15px 10px;

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
}
</style>
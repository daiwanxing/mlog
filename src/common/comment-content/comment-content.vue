<template>
  <div class="comment-box">
    <span class="comment-text"></span>
    <img src="" alt="" class="comment-emoji">
  </div>
</template>

<script>
import { h } from "vue";
export default  {
  name: "comment-content",
  props: {
    text: String // 文本
  },
  setup (props) {
    const createEmoji = function () {
      h ()
    }
    return () => {
      h("div", {
        class: "comment-box"
      }, [])
    }
  }
}
// 这个组件的目的， 1. 渲染文本， 2. 将文本中的一些[表情]替换成img标签并请求表情对应的图片
</script>

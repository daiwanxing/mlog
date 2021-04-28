<template>
  <div class="comment-box" v-html="htmlFra"></div>
</template>

<script>
import replaceContent from "@/utils/emoji-util";
import { ref } from "vue";

export default  {
  name: "comment-content",
  props: {
    text: String // 文本
  },
  setup (props) {
    let { text } = props;
    let htmlFra = ref(replaceContent(text));

    return {
      htmlFra
    }
  }
}
</script>

<style lang="scss">
.comment-box {
  .comment-emoji {
    width: 21px;
    vertical-align: bottom;
  }
}
</style>

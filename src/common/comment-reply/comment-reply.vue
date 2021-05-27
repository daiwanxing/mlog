<template>
    <div class="comment-reply">
        <template v-if="isReply">
            <div class="reply-content">
                <div>回复<router-link to="/mlog/" class="user-page">@{{props.postAuthor}}</router-link>：
                    <span v-html="replaceContent(props.postContent)"></span>
                </div>
            </div>
            <div class="post-content">
                <div v-if="props.replyContent">@{{props.postAuthor}}：{{props.replyContent}}</div>
                <div v-else>该评论已被删除</div>
            </div>
        </template>
        <template v-else>
            <div v-html="replaceContent(props.postContent)"></div>
        </template>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import replaceContent from "@/utils/emoji-util";

const props = defineProps({
    isReply: {
        type: Boolean,
        default: false,
    },
    replyContent: String,
    postAuthor: String,
    postContent: String
});

</script>

<style lang="scss">
.comment-reply {
    color: #333;
    font-size: 14px;

    .post-content {
        color: #888;
        padding: 10px;
    }

    .comment-emoji {
        width: 21px;
        vertical-align: bottom;
    }

    .user-page {
        color: #507daf;
    }
}
</style>
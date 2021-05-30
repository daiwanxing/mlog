<template>
    <ul class="comment-list-box">
        <li
            class="comment-li"
            v-for="(item, index) in comments"
            :key="index"
        >
            <div class="comment-item-box">
                <div class="comment-user">
                    <div class="comment-user-avatar">
                        <img :src="item.user.avatarUrl" :alt="item.user.nickname">
                    </div>
                    <div class="comment-user-info">
                         <div class="comment-user-name">{{item.user.nickname}}</div>
                         <div class="comment-date">{{formatCommentDate(item.time)}}</div>
                         <!-- 点赞 -->
                         <div class="comment-favor" @click="doFavorHandler(playlistId, item.commentId, item.liked, item.likedCount, $emit)">{{item.likedCount}}
                             <i class="cmt_likeicn"><svg class="u-svg u-svg-unzancmt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path :fill="item.liked ? 'var(--mainTheme)' : '#999'" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg></i>
                         </div>
                    </div>
                </div>
                <div class="comment-desc">
                    <comment-reply 
                        :postContent="item.content"
                        :postAuthor="item.beReplied.length ? item.beReplied[0].user.nickname : ''"
                        :replyContent="item.beReplied.length ? item.beReplied[0].content : ''"
                        :isReply="item.beReplied.length !== 0"
                    ></comment-reply>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
// 评论列表组件
import { toRefs } from "vue";
import commentReply from '@/common/comment-reply/comment-reply.vue';
import useComment from "@/composables/useComment";

export default {
    components: {
       commentReply
    },
    props: {
        playlistId: {
            type: Number,
        },
        comments: {
            type: Array,
            default() {
                return []
            }
        }
    },
    setup(props) {
        const { comments } = toRefs(props);
        const { formatCommentDate, doFavorHandler } = useComment(comments);

        return {
            formatCommentDate,
            doFavorHandler
        }
    }
}
</script>

<style scoped lang="scss">
    .comment-list-box {
        margin: 10px 0 0;
        padding: 0 10px;

        .comment-li:last-child {

          .comment-desc {
            border-bottom-color: transparent;
          }

          .comment-item-box {
            padding-bottom: 0;
          }
        }

        .comment-item-box {
            display: flex;
            flex-direction: column;
            padding-bottom: 14px;

            .comment-user {
                display: flex;
            }

            .comment-user-avatar {
                width: 32px;
                height: 32px;
                flex-shrink: 0;
                object-fit: cover;
                overflow: hidden;
                border-radius: 50%;

                img {
                    width: 100%;
                }
            }

            .comment-user-info {
                position: relative;
                flex: 1;
                margin-left: 10px;
                font-size: 12px;
                color: #666;

                .comment-favor {
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #999;
                }
            }

            .comment-desc {
                margin-top: 5px;
                margin-left: 42px;
                line-height: 22px;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, .1);
                color: #333;
                font-size: 14px;
            }

            .reply-content {
                color: #888;
                padding: 10px;
            }

            .user-page {
              color: #507daf;
            }

            .cmt_likeicn {
              display: inline-block;
              vertical-align: bottom;
              width: 14px;
              height: 14px;
            }
        }
    }
</style>

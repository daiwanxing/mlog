<template>
    <ul class="comment-list-box">
        <li 
            v-for="(item, index) in comments"
            :key="index"
        >
            <div class="comment-item-box">
                <div class="comment-user">
                    <div class="comment-user-avatar">
                        <img :src="item.user.avatarUrl" alt="">
                    </div>
                    <div class="comment-user-info">
                         <div class="comment-user-name">{{item.user.nickname}}</div>
                         <div class="comment-date">{{formatDate(item.time)}}</div>
                         <!-- 脱离文档流 -->
                         <!-- <div class="comment-favor"></div> -->
                    </div>
                </div>
                <div class="comment-desc">{{item.content}}</div>
            </div>
        </li>
    </ul>
</template>

<script>
// 评论列表组件
import dayjs from '@/utils/dayjs-util';

export default {
    props: {
        comments: {
            type: Array,
            default () {
                return []
            }
        }
    },
    setup() {

        function formatDate (data) {
            return dayjs(data).fromNow();
        }

        return {
            formatDate
        }
    }
}
</script>

<style scoped lang="scss">
    .comment-list-box {
        margin-top: 10px;
        padding: 0 10px;

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
                flex: 1;
                margin-left: 10px;
                font-size: 12px;
                color: #666;
            }

            .comment-desc {
                padding-left: 42px;
                color: #333;
                font-size: 14px;
            }
        }
    }
</style>
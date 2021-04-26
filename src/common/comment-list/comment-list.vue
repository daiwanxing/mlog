<template>
    <ul class="comment-list-box">
        <li 
            v-for="(item, index) in comments"
            :key="index"
        >
            <div class="comment-item-box">
                <div class="comment-user">
                    <div class="comment-user-avatar"></div>
                    <div class="comment-user-info">
                         <span class="comment-user-name">{{item.user.nickname}}</span>
                         <span class="comment-date"></span>
                         <!-- 脱离文档流 -->
                         <!-- <div class="comment-favor"></div> -->
                    </div>
                    <div class="comment-desc">{{item.content}}</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import dayjs from '@/utils/dayjs-util';
// 评论列表组件
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
        
    }
}
</script>

<style scoped lang="scss">

</style>
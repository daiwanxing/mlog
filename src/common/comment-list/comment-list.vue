<template>
    <ul class="comment-list-box">
        <li></li>
    </ul>
</template>

<script>
// 评论列表组件
export default {
    props: {
        commentList: {
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
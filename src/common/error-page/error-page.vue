<template>
    <section class="error-found-box" @click="$emit('retry')">
         <img src="//s3.music.126.net/mobile-new/img/load_error_2x.png?9861afed1332e893b2d265d362311797=" alt="加载失败，点击重试" class="error-found-image">
         <p class="error-found-text">{{tips}}</p>
    </section>    
</template>

<script setup>
import { defineProps } from 'vue';
// script setup现在直接将定义的变量最顶层绑定至模板  -> https://github.com/vuejs/rfcs/pull/222
// 通过defineProps助手定义props ->  https://github.com/vuejs/rfcs/pull/227
const { tips } = defineProps({
    tips: {
        type: String,
        default: "加载失败，点击重试"
    }
});
</script>

<style scoped lang="scss">
    .error-found-box {
        padding: 40px 0;
        text-align: center;
        
        .error-found-image {
            width: 94px;
            height: 90px;
        }

        .error-found-text {
            color: #666;
            font-size: 14px;
        }
    }
</style>
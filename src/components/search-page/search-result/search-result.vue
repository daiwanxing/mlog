<template>
    <div class="search-result-box">
        <loading-bar v-if="loading"></loading-bar>
        <song-list v-else></song-list>
    </div>
</template>

<script>
import songList from "@/common/song-list/song-list.vue";
import loadingBar from "@/common/loading/loading.vue";
import { toRef } from "vue";

export default {
    inheritAttrs: false,
    name: "search-result",
    components: {
        songList,
        loadingBar
    },
    props: {
        loading: Boolean
    },
    setup(props) {
        const loading = toRef(props, "loading");

        return {
            loading
        }
    }
}
</script>
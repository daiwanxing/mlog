<template>
  <ul class="songs-group--list">
    <li v-for="(item, idx) in songs" :key="idx" class="song-item">
      <a class="song-link" :href="`/song/${item.id}`">
        <div class="song-name" :data-alias="item.song.alias">{{item.song.name}}&nbsp;</div>
        <div class="song-author-info">
            <!-- SQ 独家 VIP -->
            <div class="mark-box">
                <template v-if="item.song.exclusive">
                    <span>独家</span>
                </template>
            </div>
            <!-- 作者列表 -->
            <div class="author-list">
                <template
                    v-for="(author, idx) in item.song.artists"
                    :key="idx"
                >
                    {{author.name}} {{ idx !== item.song.artists.length - 1 ? "/&nbsp;" : ""}}
                </template>
                - {{item.song.album.name}}
            </div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
/***
 * 歌曲列表组件
 */
import { toRef } from "vue";
export default {
  name: "song-list",
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const songs = toRef(props, "songs");

    return {
      songs,
    };
  },
};
</script>

<style scoped lang="scss">
.songs-group--list {
  padding: 0 10px;

  .song-item {
    border-bottom: 1px solid #efeff0;
    padding-right: 42px;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        right: 12px;
        top: 12px;
        height: 22px;
        width: 22px;
        background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=") no-repeat;
        background-position: -24px 0;
        background-size: 166px 97px;

    }

    .song-author-info {
      font-size: 12px;
    }

    .song-link {
        display: block;
        padding: 6px 0;
    }

    .song-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #333;
        font-size: 17px;

        &::after {
            content: attr(data-alias);
            color: #888;
        }
    }

    .song-author-info {
        display: flex;
        align-items: center;
        color: #888;
        font-size: 12px;
        height: 18px;

        .mark-box:not(:empty) {
            border: 1px solid #fdb195;
            font-size: 12px;
            padding: 2px;
            color: #fe672e;
            transform: scale(0.7);
        }
    }
  }
}
</style>

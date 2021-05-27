<template>
  <div class="history-record-box">
    <ul class="history-search-group">
      <li
        v-for="item in recordList"
        :key="item"
        class="history-chip"
        tabindex="0"
        @keyup.enter="$emit('searchHandler', item)"
        @click="$emit('searchHandler', item)"
      >
        {{ item }}
        <i class="del-button-outline" @click.stop="removeRecord(item)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, onDeactivated } from "vue";
import useHistoryRecord from "@/useComposition/useHistoryRecord";

export default {
  name: "history-record",
  setup() {
    const { recordList, addRecordListener, removeRecord, removeRecordListener } = useHistoryRecord();
    onMounted(addRecordListener);
    onDeactivated(removeRecordListener);

    return {
      recordList,
      removeRecord,
    };
  },
};
</script>

<style scoped lang="scss">
.history-record-box {
  .history-search-group {
    margin: 0;
  }

  .history-chip {
    position: relative;
    padding-right: 40px;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 45px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &::before {
      content: "";
      position: absolute;
      left: -40px;
      top: 0;
      width: 40px;
      height: 100%;
      background: var(--icon-clock) no-repeat center;
      background-size: 15px;
    }
  }

  .del-button-outline {
    position: absolute;
    right: 0;
    width: 40px;
    height: 100%;
    background: var(--icon-del-lined) no-repeat center;
    background-size: 12px;
  }
}
</style>
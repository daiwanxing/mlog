<template>
  <div class="history-search">
    <ul class="his-search-group suggest-group">
      <li
        v-for="item in recordList"
        :key="item"
        class="suggest-item history-chip"
        @click="$emit('searchHandler', item)"
      >
        {{ item }}
        <i class="del-button-outline" @click.stop="removeRecord(item)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
// 历史记录组件，职责
// 1. 展示用户本地搜索过的历史记录 done
// 2. 删除某条历史记录 done
// 3. 点击某一条历史记录，向父组件传递数据 done
// 4. 新增一条历史记录, 由父组件emit
import { onMounted, toRefs } from "vue";
import useHistoryRecord from "@/useComposition/useHistoryRecords";

export default {
  name: "history-record",
  setup () {
    const { recordList, addRecordListener, removeRecord } = useHistoryRecord();
    onMounted(addRecordListener);

    return {
      recordList,
      removeRecord
    }
  }
};
</script>

<style scoped lang="scss">
  
</style>
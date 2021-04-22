import mitt, { MESSAGE_CONSTANTS } from "mitt";
import STORAGE_LIST from "@/utils/STORAGE-LIST";
import { getStorage, setStorage } from "@/utils/util";
import { ref } from "vue";

export default function useHistoryRecord() {
    const recordList = ref(getStorage(STORAGE_LIST.HISTORY_STORAGE, []));

    // 新增历史记录
    const addRecordListener = function () {
        mitt.on(MESSAGE_CONSTANTS.ADD_HISTORY, function (data) {
            if (!recordList.value.includes(data)) {
                recordList.value.push(data);
                setStorage(STORAGE_LIST.HISTORY_STORAGE, recordList.value);
            };
        });
    }

    // 删除历史记录
    const removeRecord = function (data) {
        const delIndex = recordList.value.findIndex(record => record === data);
        if (delIndex > -1) {
            recordList.value.splice(delIndex, 1);
            setStorage(STORAGE_LIST.HISTORY_STORAGE, recordList.value);
        };
    }

    return {
        addRecordListener,
        removeRecord,
        recordList
    }
}
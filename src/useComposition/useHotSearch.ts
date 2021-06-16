import { fetchHotSearch } from "@/api/index";
import mitt, { MESSAGE_CONSTANTS } from "@/utils/mitt";
import { ref } from "vue";

export function fetchHotList () {
    const loading = ref(true);
    const hotList = ref([]);
    fetchHotSearch().then(({ result }) => {
        hotList.value = result;
    }).catch(error => {
        console.error(error);
        hotList.value = [];
    }).finally(() => {
        loading.value = false;
    });

    return {
        loading,
        hotList
    };
}

export function hotSelectHandler (data: string, emiter: any):void {
    mitt.emit(MESSAGE_CONSTANTS.ADD_HISTORY, data); // 添加一条历史记录
    emiter("searchHandler", data); // 通知父组件
}
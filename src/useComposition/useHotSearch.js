import { fetchHotSearch } from "@/api/index";
import mitt, { MESSAGE_CONSTANTS } from "@/utils/mitt";

export async function fetchHotList (storage) {
    try {
        let data = await fetchHotSearch() || [];
        storage.value = data.result;
    } catch (e) {
        console.error(e);
    }
}

export function hotSelectHandler (data, vmEmit) {
    mitt.emit(MESSAGE_CONSTANTS.ADD_HISTORY, data); // 添加一条历史记录
    vmEmit("searchHandler", data); // 通知父组件
}
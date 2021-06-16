import { ref } from "vue";
import { fetchSearchSuggest, fetchSearch } from "@/api/index";
import { unwrapRef } from "@/utils/util";

export function suggestSearchHandler () {
    loadingState.value = true;
    let searchVal = unwrapRef(searchKey);
    if (searchVal) {
        fetchSearchSuggest(searchVal)
        .then(({ result }) => {
            suggestList.value = result.allMatch || [];
        })
        .catch(error => {
            alert('oops!', error);
        })
        .finally(() => {
            loadingState.value = false;
        });
    }
}


export function seachSongHandler () {
    loadingState.value = true;
    fetchSearch(unwrapRef(searchKey))
        .then(( { result }) => {
            searchList.value = result.songs;  
        })
        .catch(error => {
            alert('oops!', error);
        })
        .finally(() => {
            loadingState.value = false;
        });
}

export function switchSuggest () {
    // 切换到建议搜索页面，如果searchKey不为空，
    // 关闭 热门搜索数据，历史记录数据，显示建议列表
}

const disableSuggest = ref(false);

export const searchKey = ref('');

export const suggestList = ref([]);

export const searchList = ref([]);

export const loadingState = ref(false);

export function useSearch () {
    return {
        searchKey,
        suggestList,
        searchList,
        loadingState,
        disableSuggest
    }
}
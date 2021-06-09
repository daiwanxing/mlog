import { ref } from "vue";
import { fetchSearchSuggest, fetchSearch } from "@/api/index";
import { unwrapRef } from "@/utils/util";

export function suggestSearchHandler () {
    loadingState.value = true;
    fetchSearchSuggest(unwrapRef(searchKey))
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

export function updateSuggestList () {
    // 1. 
}

export const searchKey = ref('');

export const suggestList = ref([]);

export const searchList = ref([]);

export const loadingState = ref(false);

export function useSearch () {
    return {
        searchKey,
        suggestList,
        searchList,
        loadingState
    }
}
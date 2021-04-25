/*
 * @Author: Daiwanxing 
 * @Date: 2021-04-23 14:57:22 
 * @Last Modified by: Daiwanxing
 * @Last Modified time: 2021-04-25 16:10:32
 * 网易云歌单相关接口
 */
import axios from '../utils/axios-utils';

/**
 * 获取歌单详情
 * @param id 歌单id
 */
export function fetchSongList (id) {
    return axios.get("/playlist/detail", {
        params: {
            id
        }
    });
}

/***
 * 获取歌单详情动态数据，如评论数，是否收藏，播放次数
 * @param id 歌单id
 */
export function fetchSongListDynamic (id) {
    return axios.get("/playlist/detail/dynamic", {
        params: {
            id
        }
    })
}
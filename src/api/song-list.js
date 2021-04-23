/*
 * @Author: Daiwanxing 
 * @Date: 2021-04-23 14:57:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-04-23 14:59:18
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
    })
}
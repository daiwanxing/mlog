/*
 * @Author: Daiwanxing 
 * @Date: 2021-04-23 14:57:22 
 * @Last Modified by: Daiwanxing
 * @Last Modified time: 2021-04-25 20:30:41
 * 评论 接口
 */
import axios from '../utils/axios-utils';

/**
 * 获取歌单评论 （ need not login ）
 * @param id 歌单id
 * @param limit 取出评论数
 * @param offset 偏移数，做分页
 */
export function fetchPlayListComment (id, limit = 20) {
    return axios.get("/comment/playlist", {
        params: {
            id,
            limit
        }
    })
}
/*
 * @Author: Daiwanxing
 * @Date: 2021-04-23 14:57:22
 * @Last Modified by: Daiwanxing
 * @Last Modified time: 2021-05-30 20:16:30
 * 评论接口
 */
import axios from '../utils/axios-utils';

/**
 * 获取歌单评论 （ 不需要登录 ）
 * @param id 歌单id
 * @param limit 取出评论数
 * @param offset 偏移数，做分页
 */
export function fetchPlayListComment (id, limit = 20, offset = 0) {
    return axios.get("/comment/playlist", {
        params: {
            id,
            limit,
            offset: limit * offset
        }
    })
}

/***
 * 获取精彩评论 （不需要登录）
 * @param id 资源id
 * @param type 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 * 0 歌曲 1 mv 2 歌单 3 专辑 4 电台 5 视频
 * @param limit 取出评论数
 * @param offset 偏移数 分页
 */
export function fetchHotComments (id, type, limit = 20, offset) {
    return axios.get("/comment/hot", {
        params: {
            id,
            type,
            limit,
            offset
        }
    });
}

/***
 * 给评论点赞
 * @param id 歌曲id / mv id / 歌单id
 * @param cid 评论id
 * @param t 1 点赞 0 取消点赞
 * @param type 点赞所属的类型 （歌单，mv，电台） 歌单默认是2
 */
export function doFavor (id, cid, t = 1, type = 2) {
    return axios.get("/comment/like", {
        params: {
            id,
            cid,
            t,
            type
        }
    });
}
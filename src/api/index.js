import axios from '../utils/axios-utils';

/***
 * 获取轮播图
 */
export function fetchBanner () {
    return axios.get('/banner');
}

/***
 * 获取推荐歌单 （非登录）
 * @param limit 不传后端默认返回30条
 */
export function fetchSongList (limit) {
    return axios.get('/personalized', {
        params: {
            limit
        }
    });
}

/***
 * 获取推荐的新音乐
 * @param limit 不传后端默认返回10条
 */
export function fetchNewMusic (limit = 10) {
    return axios.get('/personalized/newsong', {
        params: {
            limit
        }
    })
}
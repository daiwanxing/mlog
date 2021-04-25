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
            limit,
            realIP: "116.25.146.177"
        }
    })
}

/***
 * 根据搜索关键字获取搜索 歌手 / 歌曲 / 专辑
 * @param keywords 搜索关键字
 * @param limit 搜索的条数 默认30条
 * @param offset  偏移值 分页
 * @param type 搜索类型 1 为单曲 10： 专辑 100：歌手 1000：歌单 1002：用户
 */
export function fetchSearch (keywords, limit = 30, type = 1, offset = 0) {
    return axios.get('/search', {
        params: {
            keywords,
            limit,
            type,
            offset
        }
    });
}

/***
 * 热搜列表
 */
export function fetchHotSearch () {
    return axios.get('/search/hot');
}

/***
 * 搜索建议
 */
export function fetchSearchSuggest (keywords) {
    return axios.get('/search/suggest', {
        params: {
            type: "mobile",
            keywords
        }
    });
}
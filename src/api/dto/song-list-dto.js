/***
 * 歌单详情列表DTO
 */
export function songListDetailDto (data) {
    return data.map(item => {
        return {
            id: item.id,
            name: item.name,
            artists: item.ar,
            album: {
                name: item.al.name
            },
            exclusive: !!item.exclusive
        }
    });
}
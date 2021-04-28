/*
 * @Author: Daiwanxing
 * @Date: 2021-04-22 11:20:43
 * @Last Modified by: Daiwanxing
 * @Last Modified time: 2021-04-22 11:21:03
 * 该文件工具类用于将一些常见的emoji表情转换成图片
 * 例如： [笑哭] -> 请求一张网易云的笑哭标签
 */

import { h } from "vue"

const EMOJI_LIST = {
    "[笑哭]": "https://s1.music.126.net/style/web2/emoji/emoji_86@2x.png",
    "[可爱]": "https://s1.music.126.net/style/web2/emoji/emoji_85@2x.png",
    "[憨笑]": "https://s1.music.126.net/style/web2/emoji/emoji_359@2x.png",
    "[色]": "https://s1.music.126.net/style/web2/emoji/emoji_95@2x.png",
    "[亲亲]": "https://s1.music.126.net/style/web2/emoji/emoji_363@2x.png",
    "[惊恐]": "https://s1.music.126.net/style/web2/emoji/emoji_96@2x.png",
    "[流泪]": "https://s1.music.126.net/style/web2/emoji/emoji_356@2x.png",
    "[亲]": "https://s1.music.126.net/style/web2/emoji/emoji_362@2x.png",
    "[呆]": "https://s1.music.126.net/style/web2/emoji/emoji_352@2x.png",
    "[呲牙]": "https://s1.music.126.net/style/web2/emoji/emoji_343@2x.png",
    "[吐舌]": "https://s1.music.126.net/style/web2/emoji/emoji_348@2x.png",
    "[撇嘴]": "https://s1.music.126.net/style/web2/emoji/emoji_353@2x.png",
    "[怒]": "https://s1.music.126.net/style/web2/emoji/emoji_361@2x.png",
    "[奸笑]": "https://s1.music.126.net/style/web2/emoji/emoji_341@2x.png",
    "[汗]": "https://s1.music.126.net/style/web2/emoji/emoji_97@2x.png",
    "[痛苦]": "https://s1.music.126.net/style/web2/emoji/emoji_346@2x.png",
    "[惶恐]": "https://s1.music.126.net/style/web2/emoji/emoji_354@2x.png",
    "[生病]": "https://s1.music.126.net/style/web2/emoji/emoji_350@2x.png",
    "[口罩]": "https://s1.music.126.net/style/web2/emoji/emoji_351@2x.png",
    "[大哭]": "https://s1.music.126.net/style/web2/emoji/emoji_357@2x.png",
    "[晕]": "https://s1.music.126.net/style/web2/emoji/emoji_355@2x.png",
    "[发怒]": "https://s1.music.126.net/style/web2/emoji/emoji_115@2x.png",
    "[开心]": "https://s1.music.126.net/style/web2/emoji/emoji_360@2x.png",
    "[鬼脸]": "https://s1.music.126.net/style/web2/emoji/emoji_94@2x.png",
    "[皱眉]": "https://s1.music.126.net/style/web2/emoji/emoji_87@2x.png",
    "[流感]": "https://s1.music.126.net/style/web2/emoji/emoji_358@2x.png",
    "[爱心]": "https://s1.music.126.net/style/web2/emoji/emoji_33@2x.png",
    "[心碎]": "https://s1.music.126.net/style/web2/emoji/emoji_34@2x.png",
    "[钟情]": "https://s1.music.126.net/style/web2/emoji/emoji_303@2x.png",
    "[星星]": "https://s1.music.126.net/style/web2/emoji/emoji_309@2x.png",
    "[生气]": "https://s1.music.126.net/style/web2/emoji/emoji_314@2x.png",
    "[便便]": "https://s1.music.126.net/style/web2/emoji/emoji_89@2x.png",
    "[强]": "https://s1.music.126.net/style/web2/emoji/emoji_13@2x.png",
    "[弱]": "https://s1.music.126.net/style/web2/emoji/emoji_372@2x.png"
};


const IMAGE_REG = /<img.*?(?:>|\/>)/gi;
const EMOJI_REG = /\[.*?\]+/g;

/***
 * 匹配以[表情]结尾的内容
 * @param text 文本
 */
export default function replaceContent (text) {
    let rawText = text;
    // 替换所有符合emoji标签为img标签
    rawText = rawText.replaceAll(EMOJI_REG, item => {
        if (EMOJI_LIST[item]) {
            return `<img src="${EMOJI_LIST[item]}" class="comment-emoji" />`;
        } else {
            return item;
        }
    });

    let rawList = rawText.split(IMAGE_REG); // 以img正则作为分割点
    rawList.forEach(item => {
        if (item) {
            rawText = rawText.replace(item, `<span class="comment-text">${item}</span>`); //将普通文本用span标签包裹
        }
    });

    console.log(rawText);
    return rawText;
}

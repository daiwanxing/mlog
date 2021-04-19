

/**
 * 将数字转换成多少万
 * 例如： 139231 转成13.9万 1302310  7 - 4 =  
 */
export function translatorToMillon (number) {
    if (typeof number !== 'number' && number < 100000) return;
    number = number.toString();
    return number.substr(0, number.length - 4) + '.' + number.substr(number.length - 4, 1) + '万';
}


/**
 * 将数字转换成多少万
 * 例如： 139231 转成13.9万 1302310 
 */
export function translatorToMillon(number) {
    if (typeof number !== 'number' || number < 100000) return number;
    number = number.toString();
    return number.substr(0, number.length - 4) + '.' + number.substr(number.length - 4, 1) + '万';
}

export function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key, defaultValue = {}) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

/**
 * 清除cookie
 * @param cookieName
 * @param path
 */
export function clearCookie(cookieName, path = '/') {
    if (!cookieName) {
        // 如果不传，则删掉全部的cookie
        let cookieList = document.cookie.split(";");
        cookieList.forEach((item) => {
            let cookieName = item.split("=")[0];
            clearCookie(cookieName);
        });
    } else {
        document.cookie = `${cookieName}=0;expires=${new Date().toUTCString()};path=${path}`;
    }
}
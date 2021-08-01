import dayjs from 'dayjs/esm/index';
import zhCn from 'dayjs/esm/locale/zh-cn';
import relativeTime from 'dayjs/esm/plugin/relativeTime';

dayjs.locale(zhCn);
dayjs.extend(relativeTime)

export default dayjs;
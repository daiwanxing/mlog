import SwiperCore, {Pagination, Autoplay, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/lazy/lazy.scss';

SwiperCore.use([Pagination, Autoplay, Lazy]);

export function installSwiperModule () {
    return {
        Swiper,
        SwiperSlide
    }
}

import SwiperCore, {Pagination, Autoplay } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Pagination, Autoplay]);

export function installSwiperModule () {
    return {
        Swiper,
        SwiperSlide
    }
}
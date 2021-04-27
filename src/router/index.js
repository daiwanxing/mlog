import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const index = () => import('@/components/index/index.vue');
const playlist = () => import('@/components/playlist-detail/playlist-detail.vue');

const routes = [
    {
        path: '/',
        name: 'root',
        redirect () {
            return { name: '/mlog' }
        }
    },
    {
        path: '/mlog',
        name: 'mlog',
        component: index
    },
    {
        path: '/mlog/playlist',
        name: 'playlist',
        component: playlist
    },
    {
        path: '/song/:id',
        name: 'play-song'
    }
];

const router = createRouter({
    history: createWebHistory(), // 新的history方法取代了原来的mode属性
    routes,
    scrollBehavior () {
        return { top: 0}
    }
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const index = () => import('@/components/index/index.vue');
const routes = [
    {
        path: '/',
        name: 'index',
        redirect () {
            return { name: '/mlog' }
        }
    },
    {
        path: '/mlog',
        name: 'mlog',
        component: index
    }
];

const router = createRouter({
    history: createWebHistory(), // 新的history方法取代了原来的mode属性
    routes
});

export default router;
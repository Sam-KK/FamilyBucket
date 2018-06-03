import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/goods'
        },
        {
            path: '/goods',
            name: goods,
            component: goods
        },
        {
            path: '/seller',
            name: seller,
            component: seller
        }
    ]
})

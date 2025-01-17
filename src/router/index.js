import userTableTemplate from '../components/content/user_table.vue'
import listTemplate from '../components/content/list.vue'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/user'
        },
        {
            path: '/user',
            component: userTableTemplate,
            props: {
                title: '首页'
            }
        },
        {
            path: '/list',
            component: listTemplate,
            props: {
                title: '取件'
            }
        }
    ]
})



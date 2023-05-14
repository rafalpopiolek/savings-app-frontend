import {createRouter, createWebHistory} from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'home',
        component: DefaultLayout,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: DashboardView
            }
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

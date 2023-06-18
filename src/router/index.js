import {createRouter, createWebHistory} from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import {useUserStore} from "@/store/userStore.js";
import ChartsView from "@/views/ChartsView.vue";

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
            },
            {
                path: '/charts',
                name: 'charts',
                component: ChartsView
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

router.beforeEach(async (to) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);

    const user = useUserStore();

    const userAuthenticated = user.isAuthenticated();

    if (userAuthenticated === false && authRequired) {
        return {name: 'login'};
    }
});

export default router;

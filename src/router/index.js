import {createRouter, createWebHistory} from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import {useUserStore} from "@/store/userStore.js";

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

router.beforeEach(async (to, from) => {
    const userAuthenticationPages = ['/login', '/register'];
    const authRequired = !userAuthenticationPages.includes(to.path);
    const auth = useUserStore();

    if (authRequired && !auth.isAuthenticated()) {
        return '/login';
    }

    if (!authRequired && auth.isAuthenticated()) {
        return from.path;
    }
});

export default router;

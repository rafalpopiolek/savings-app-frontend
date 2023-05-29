<script setup>
    import {Dropdown} from "flowbite";
    import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
    import UserDefaultAvatar from "@/assets/images/default-user-avatar.png";
    import router from "@/router/index.js";
    import {useUserStore} from "@/store/userStore.js";

    const userStore = useUserStore();

    async function logout() {
        const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + userStore.user.token,
            },
            method: "POST",
        });

        if (response.status === 200) {
            userStore.removeToken();
            userStore.removeRefreshToken();

            await router.push({name: "login"})
        }
    }
</script>

<template>
    <button type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom">
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" :src="UserDefaultAvatar" alt="user photo">
    </button>

    <div
        class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        id="user-dropdown">
        <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
                <a href="#"
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Settings
                </a>
            </li>
            <li>
                <ThemeSwitcher
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Change Theme
                </ThemeSwitcher>
            </li>
            <li>
                <a @click="logout"
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Sign out
                </a>
            </li>
        </ul>
    </div>
</template>

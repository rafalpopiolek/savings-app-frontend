<script setup>
    import {Dropdown} from "flowbite";
    import defaultAvatar from "@/assets/default-user-avatar.png"

    import {useDark, useToggle} from "@vueuse/core";
    import ThemeSwitcher from "@/components/ThemeSwitcher.vue";

    const isDark = useDark();
    const toggleDark = useToggle(isDark);
</script>

<template>
    <button class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            data-dropdown-toggle="dropdownAvatar"
            type="button">
        <img class="w-8 h-8 rounded-full" :src="defaultAvatar" alt="User photo">
    </button>

  <!-- Dropdown menu -->
    <div id="dropdownAvatar"
         class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 border dark:border-gray-900">
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div class="font-medium truncate">name@flowbite.com</div>
        </div>

        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
            </li>
        </ul>

        <div class="py-2">
            <a @click="toggleDark()"
               class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                Change theme
            </a>
        </div>

        <div class="py-2">
            <a href="#"
               class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Sign out
            </a>
        </div>
    </div>

</template>

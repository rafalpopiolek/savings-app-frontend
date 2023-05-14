<script setup>
    import {useDark, useToggle} from "@vueuse/core";

    const isDark = useDark();
    const toggleDark = useToggle(isDark);
</script>

<template>
    <a @click="toggleDark()"
       class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 dark:hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white cursor-pointer rounded-md">
        <slot/>
    </a>
</template>

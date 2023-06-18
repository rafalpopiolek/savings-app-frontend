<script setup>
    import {DisclosurePanel} from "@headlessui/vue";
</script>

<template>
    <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
            <RouterLink to="dashboard"
                        class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 block rounded-md px-3 py-2 text-base font-medium text-center">
                Home
            </RouterLink>
            <RouterLink to="charts"
                        class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 block rounded-md px-3 py-2 text-base font-medium text-center">
                Charts
            </RouterLink>
        </div>
    </DisclosurePanel>
</template>


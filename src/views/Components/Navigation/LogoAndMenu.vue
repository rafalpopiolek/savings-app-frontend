<script setup>
    import MoneyLogo from "@/assets/images/money-logo.svg"
</script>

<template>
    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
            <img :src="MoneyLogo" class="h-8 mr-3" alt="Savings tracker Logo"/>
        </div>
        <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
                <RouterLink to="dashboard"
                            class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md px-3 py-2 text-sm font-medium hover:rounded-md">
                    Home
                </RouterLink>
            </div>
        </div>
    </div>
</template>

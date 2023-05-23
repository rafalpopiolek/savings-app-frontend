<script setup>
    import MoneyLogo from "@/../public/assets/images/money-logo.svg";
</script>

<template>
    <RouterLink to="dashboard" class="flex items-center">
        <img :src="MoneyLogo" class="h-8 mr-3" alt="Savings tracker Logo"/>
        <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Savings Tracker</span>
    </RouterLink>
</template>

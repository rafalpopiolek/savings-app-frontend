<script setup>
    import {Dropdown} from "flowbite";
    import UserProfileDropdown from "@/views/Components/Navigation/UserProfileDropdown.vue";
    import Logo from "@/views/Components/Navigation/Logo.vue";
    import MobileMenuButton from "@/views/Components/Navigation/MobileMenuButton.vue";
    import MobileMenu from "@/views/Components/Navigation/MobileMenu.vue";
</script>

<template>

    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Logo/>

            <div class="flex items-center md:order-2">
                <UserProfileDropdown/>

                <MobileMenuButton/>
            </div>

            <MobileMenu/>
        </div>
    </nav>
</template>

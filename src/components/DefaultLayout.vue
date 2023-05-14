<script setup>
    import UserProfileDropdown from "@/views/Components/UserProfileDropdown.vue";
    import ThemeSwitcher from "@/components/ThemeSwitcher.vue";

    let isLogged = true;
</script>

<template>
    <div class="flex flex-col min-h-screen dark:bg-gray-800">
        <nav class="flex justify-between py-2 pl-2 bg-blue-300 dark:bg-gray-900">
            <div class="my-auto">
                <ul class="flex gap-3 dark:text-gray-300">
                    <li>Home</li>
                    <li>Products</li>
                    <li>About</li>
                </ul>
            </div>

            <div class="pr-2">
                <div v-if="isLogged">
                    <UserProfileDropdown/>
                </div>

                <div v-else class="flex gap-2">
                    <RouterLink to="login"
                                class="my-auto bg-blue-100 hover:bg-white px-2 py-1 rounded-md cursor-pointer">
                        Login
                    </RouterLink>

                    <RouterLink to="register"
                                class="my-auto bg-blue-100 hover:bg-white px-2 py-1 rounded-md cursor-pointer">
                        Register
                    </RouterLink>

                    <ThemeSwitcher>Change Theme</ThemeSwitcher>
                </div>
            </div>
        </nav>

        <main class="dark:bg-gray-800">
            <section class="sm:w-full md:w-3/4 xl:w-3/5 mx-auto px-3 py-10">
                <RouterView/>
            </section>
        </main>
    </div>
</template>

<script setup>
    import {Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
    import {Bars3Icon, XMarkIcon} from '@heroicons/vue/24/outline'
    import {useUserStore} from "@/store/userStore.js";
    import router from "@/router/index.js";
    import MobileNavigation from "@/views/Components/Navigation/MobileNavigation.vue";
    import LogoAndMenu from "@/views/Components/Navigation/LogoAndMenu.vue";
    import ThemeChangeIcons from "@/components/ThemeChangeIcons.vue";
    import AddSaving from "@/views/Components/Saving/AddSaving.vue";

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
    <Disclosure as="nav" class="bg-gray-50 border-b-2 dark:bg-gray-900 dark:border-y-gray-950 shadow-sm"
                v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-400 dark:hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
                    </DisclosureButton>
                </div>

                <LogoAndMenu/>

                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                    <AddSaving/>

                    <ThemeChangeIcons/>

                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <MenuButton
                                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full"
                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                     alt=""/>
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-white dark:border-gray-900">

                                <MenuItem v-slot="{ active }">
                                    <a href="#" @click="logout"
                                       :class="[active ? 'bg-gray-100 dark:bg-gray-900' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']">
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>

        <MobileNavigation/>
    </Disclosure>
</template>

<script setup>
    import {reactive} from "vue";
    import {useUserStore} from "@/store/userStore.js";
    import router from "@/router/index.js";
    import ThemeChangeIcons from "@/components/ThemeChangeIcons.vue";

    const userStore = useUserStore();

    const form = reactive({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    async function register() {
        const response = await fetch("http://localhost:8080/api/v1/auth/register", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: "POST",
            body: JSON.stringify(form)
        });

        if (!response.ok) {
            await router.push({name: "register"})
        }

        await router.push({name: "login"});
    }
</script>

<template>
    <div class="grid h-screen place-items-center bg-gray-100 dark:bg-gray-800">
        <div
            class="flex w-1/3 mx-auto flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-200 border border-gray-300 rounded-2xl dark:bg-gray-700 dark:border-gray-800">

            <div class="flex justify-end text-gray-900 dark:text-gray-300">
                <ThemeChangeIcons/>
            </div>

            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300">
                    Create new account
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="register">
                    <div>
                        <label for="firstname"
                               class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                            First name</label>
                        <div class="mt-2">
                            <input v-model="form.firstname" id="firstname" name="firstname" type="text" required
                                   class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0 dark:bg-gray-200"/>
                        </div>
                    </div>

                    <div>
                        <label for="lastname"
                               class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Last
                            name</label>
                        <div class="mt-2">
                            <input v-model="form.lastname" id="lastname" name="lastname" type="text"
                                   autocomplete="email"
                                   required
                                   class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0 dark:bg-gray-200"/>
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Email
                            address</label>
                        <div class="mt-2">
                            <input v-model="form.email" id="email" name="email" type="email" autocomplete="email"
                                   required
                                   class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0 dark:bg-gray-200"/>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password"
                                   class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Password</label>
                        </div>
                        <div class="mt-2">
                            <input v-model="form.password" id="password" name="password" type="password"
                                   autocomplete="current-password" required
                                   class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0 dark:bg-gray-200"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Create
                        </button>
                    </div>

                    <div class="flex justify-end text-sm">
                        <RouterLink class="text-blue-600 hover:text-blue-900 dark:text-indigo-500" to="login">
                            Already have account? Sign in
                        </RouterLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

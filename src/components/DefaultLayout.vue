<script setup>
    import Navigation from "@/views/Components/Navigation/Navigation.vue";
</script>

<template>
    <div class="flex flex-col min-h-screen dark:bg-gray-800">

        <Navigation/>

        <main class="dark:bg-gray-800">
            <section class="sm:w-full md:w-3/4 xl:w-3/5 mx-auto px-3 py-10">
                <RouterView/>
            </section>
        </main>
    </div>
</template>

<script setup>

    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        }
    });

</script>

<template>
    <div
        class="block mb-5 p-6 bg-gray-200 border border-gray-300 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="flex justify-between text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            <p>
                {{ props.name }}
                <span>({{ props.code }})</span>
            </p>
            <p class="">Total: {{ props.total }}</p>
        </div>
        <div class="text-white">

        </div>
    </div>
</template>

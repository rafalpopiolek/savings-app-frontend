<script setup>

    defineProps({
        modalActive: {
            type: Boolean,
            default: false,
        }
    });
    defineEmits(['close-modal']);
</script>

<template>
    <div v-show="modalActive" class="absolute w-full h-screen top-0 left-0 flex justify-center px-8">
        <div v-if="modalActive" @keydown.esc="$emit('close-modal')"
             class="p-12 bg-gray-200 dark:bg-gray-900 dark:text-gray-300 self-start mt-32 max-w-screen-md rounded-lg border border-gray-300 dark:border-gray-950 overflow-y-auto"
             style="max-height: 80vh;">
            <slot/>

            <div class="flex justify-between space-x-12 px-8">
                <button
                    @click="$emit('close-modal')"
                    class="text-black dark:text-gray-300 mt-8 bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 rounded-md py-2 px-6">
                    Cancel
                </button>
                <slot name="button"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {useUserStore} from "@/store/userStore.js";

    const userStore = useUserStore();

    const props = defineProps({
        data: Object
    });
</script>

<template>
    <form>
        <div class="space-y-6">
            <div>
                <label for="amount" class="block text-sm font-medium leading-6 dark:text-gray-300">Amount</label>
                <div class="mt-2">
                    <div
                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input v-model="props.data.Amount" type="number" name="amount" id="amount" min="0"
                               autocomplete="amount"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

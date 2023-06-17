<script setup>
    import {useUserStore} from "@/store/userStore.js";
    import {computed, onMounted, ref} from "vue";

    const userStore = useUserStore();

    const assets = ref([]);
    const assetTypes = ref([]);
    const selectedType = ref("");

    const props = defineProps({
        addSavingForm: Object
    })

    onMounted(async () => {
        await fetchAssetTypes();
    });

    const typeChosen = computed(() => {
        if (!selectedType.value) {
            return false;
        }

        fetchAssetsBasedOnType(selectedType);
        return assets.value.length;
    });

    async function fetchAssetTypes() {
        const response = await fetch("http://localhost:8080/api/v1/assettype", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + userStore.user.token,
            },
            method: "GET",
        });

        if (response.ok) {
            assetTypes.value = await response.json();
        }
    }

    async function fetchAssetsBasedOnType(type) {
        const response = await fetch(`http://localhost:8080/api/v1/asset/${type.value}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + userStore.user.token,
            },
            method: "GET",
        });

        if (response.ok) {
            assets.value = await response.json();
        }
    }
</script>

<template>
    <form>
        <div class="space-y-6">
            <div>
                <label for="asset" class="block text-sm font-medium leading-6 dark:text-gray-300">Type</label>
                <div>
                    <select id="asset" name="asset" autocomplete="asset-name" v-model="selectedType"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option v-for="type in assetTypes" key="{{type.name}}">
                            {{ type.name }}
                        </option>
                    </select>
                </div>
            </div>

            <div v-if="typeChosen">
                <label for="option" class="block text-sm font-medium leading-6 dark:text-gray-300">Asset</label>
                <div>
                    <select v-model="props.addSavingForm.Asset" id="option" name="option" autocomplete="option-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option v-for="asset in assets" :key="assets.code">{{ asset.code }}</option>
                    </select>
                </div>
            </div>

            <div v-if="typeChosen">
                <label for="amount" class="block text-sm font-medium leading-6 dark:text-gray-300">Amount</label>
                <div class="mt-2">
                    <div
                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input v-model="props.addSavingForm.Amount" type="number" name="amount" id="amount" min="0"
                               autocomplete="amount"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

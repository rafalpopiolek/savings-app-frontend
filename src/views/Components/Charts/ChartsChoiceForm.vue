<script setup>
    import {useUserStore} from "@/store/userStore.js";
    import {computed, onMounted, reactive, ref} from "vue";
    import Heading from "@/views/Components/Dashboard/Heading.vue";
    import {Chart} from "chart.js/auto";
    import {data} from "autoprefixer";

    const userStore = useUserStore();

    const assets = ref([]);
    const assetTypes = ref([]);
    const selectedType = ref("");
    const selectedAsset = ref("");

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

    const assetChosen = computed(() => {
        return selectedAsset.value;
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

    async function generateChart() {
        const chartData = await fetchData(selectedAsset.value);

        const ctx = document.getElementById('chart');
        const options = {month: 'long', day: 'numeric'};
        const labels = chartData.map(i => i.data);
        const dataset = {
            label: selectedAsset.value,
            data: chartData.map(i => i.price),
            borderWidth: 1
        };

        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [dataset]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true,
                        },
                        title: {
                            display: true,
                            text: 'Price'
                        }
                    },
                    x: {
                        ticks: {
                            callback: function (value, index) {
                                const date = new Date(labels[index]);
                                return date.toLocaleDateString('en-US', options)
                            }
                        }
                    }
                }
            }
        });

        chart.render();
    }

    async function fetchData(asset) {
        const response = await fetch(`http://localhost:8080/api/v1/asset/month/${asset}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + userStore.user.token,
            },
            method: "GET",
        });

        if (response.ok) {
            return await response.json();
        }
    }
</script>

<template>
    <Heading class="mb-10">Generate Monthly Chart</Heading>
    <form class="w-3/4 mx-auto">
        <div class="space-y-6">
            <div>
                <label for="asset" class="block text-gray-700 dark:text-gray-300 mb-1">Choose Type</label>
                <div class="w-full">
                    <select id="asset" name="asset" autocomplete="asset-name" v-model="selectedType"
                            class="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <option v-for="type in assetTypes" :key="type.name">
                            {{ type.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div v-if="typeChosen">
                <label for="option" class="block text-gray-700 dark:text-gray-300 mb-1">Choose Asset</label>
                <div>
                    <select id="option" name="option" autocomplete="option-name" v-model="selectedAsset"
                            class="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <option v-for="asset in assets" :key="assets.code">{{ asset.code }}</option>
                    </select>
                </div>
            </div>
            <div v-if="assetChosen">
                <div class="mt-2">
                    <div @click="generateChart"
                         class="w-full text-center bg-sky-800 rounded-md px-5 py-3 text-gray-100 hover:bg-sky-600">
                        Generate Chart
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div class="w-full mt-20">
        <canvas id="chart"></canvas>
    </div>
</template>

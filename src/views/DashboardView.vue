<script setup>
    import Heading from "@/views/Components/Dashboard/Heading.vue";
    import AssetBlock from "@/views/Components/Dashboard/AssetBlock.vue";
    import {onMounted, ref} from "vue";
    import {useUserStore} from "@/store/userStore.js";

    const userStore = useUserStore();

    let data = ref([]);
    let sum = ref(0);

    onMounted(async () => {
        await fetchData();
        calculateSum(sum);
    });

    async function fetchData() {
        const response = await fetch("http://localhost:8080/api/v1/saving", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + userStore.user.token,
            },
            method: "GET",
        });

        if (response.ok) {
            data.value = await response.json();
        }
    }

    function calculateSum(sum) {
        data.value.forEach(i => {
            sum.value += parseFloat(parseFloat(i.value))
        });
    }

    window.addEventListener('savings-updated', fetchData);
</script>

<template>
    <Heading class="mb-10">
        <div>
            <span>All your savings: </span>
            <span>{{ sum.toFixed(2)}} PLN</span>
        </div>
    </Heading>

    <AssetBlock
        v-for="item in data" :key="item.assetCode"
        :name="item.assetName"
        :code="item.assetCode"
        :total="parseFloat(item.amount)"
        :exchangeRate="item.exchangeRate"
        :valuePLN="item.value"
    />

</template>

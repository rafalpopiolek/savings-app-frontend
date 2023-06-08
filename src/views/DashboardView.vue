<script setup>
    import Heading from "@/views/Components/Dashboard/Heading.vue";
    import AssetBlock from "@/views/Components/Dashboard/AssetBlock.vue";
    import {onMounted, ref} from "vue";
    import {useUserStore} from "@/store/userStore.js";

    const userStore = useUserStore();

    let data = ref([]);

    onMounted(async () => {
        await fetchData();
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

    window.addEventListener('savings-updated', fetchData);
</script>

<template>
    <Heading/>

    <AssetBlock
        v-for="item in data" :key="item.assetCode"
        :name="item.assetName"
        :code="item.assetCode"
        :total="item.amount"
    />

</template>

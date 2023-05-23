<script setup>

    import Money from "@/views/Components/Dashboard/MainSection/Accordions/Money.vue";
    import Crypto from "@/views/Components/Dashboard/MainSection/Accordions/Crypto.vue";
</script>

<template>
    <div id="accordion-arrow-icon" data-accordion="open">
        <Money/>
        <Crypto/>
    </div>
</template>

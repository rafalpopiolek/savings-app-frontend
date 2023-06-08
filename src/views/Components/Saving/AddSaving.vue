<script setup>
    import BaseModal from "@/components/BaseModal.vue";
    import {onMounted, onUnmounted, reactive, ref} from "vue";
    import AddSavingForm from "@/views/Components/Saving/AddSavingForm.vue";
    import {useUserStore} from "@/store/userStore.js";

    const userStore = useUserStore();

    const modalActive = ref(false);
    const toggleModal = () => {
        modalActive.value = !modalActive.value;
    }

    const closeModalEscKey = (event) => {
        if (event.key === "Escape") {
            modalActive.value = false;
        }
    };

    onMounted(() => {
        window.addEventListener("keydown", closeModalEscKey);
    });

    onUnmounted(() => {
        window.removeEventListener("keydown", closeModalEscKey);
    });

    const form = reactive({
        Asset: '',
        Amount: null,
    });

    async function addSaving() {
        const response = await fetch("http://localhost:8080/api/v1/saving", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + userStore.user.token,
            },
            method: "POST",
            body: JSON.stringify(form)
        });

        if (response.ok) {
            toggleModal();
            window.dispatchEvent(new Event('savings-updated'));
        }
    }
</script>

<template>
    <button @click="toggleModal"
            class="bg-sky-300 dark:bg-sky-500 hover:bg-sky-400 dark:hover:bg-sky-400 rounded-md px-4 py-1 mr-5">Add
    </button>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <AddSavingForm :addSavingForm="form"/>

        <template v-slot:button>
            <button
                @click="addSaving"
                class="text-black dark:text-gray-200 mt-8 bg-sky-300 hover:bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-400 rounded-md py-2 px-6">
                Add
            </button>
        </template>
    </BaseModal>
</template>

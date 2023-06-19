<script setup>
    import BaseModal from "@/components/BaseModal.vue";
    import {onMounted, onUnmounted, reactive, ref} from "vue";
    import EditSavingForm from "@/views/Components/Saving/EditSavingForm.vue";
    import {useUserStore} from "@/store/userStore.js";

    const userStore = useUserStore();

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
        },
        exchangeRate: {
            type: Number,
            required: true,
        },
        valuePLN: {
            type: Number,
            required: true,
        }
    });

    const newData = reactive({
        Asset: props.code,
        Amount: props.total,
    });

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

    async function updateSaving() {
        const response = await fetch("http://localhost:8080/api/v1/saving", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + userStore.user.token,
            },
            method: "PUT",
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            toggleModal();
            window.dispatchEvent(new Event('savings-updated'));
        }
    }

    async function deleteItem() {
        if (!confirm("Are you sure?")) {
            return;
        }

        const response = await fetch(`http://localhost:8080/api/v1/saving/${props.code}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + userStore.user.token,
            },
            method: "DELETE",
        });
        console.log(response)
        if (response.ok) {
            window.dispatchEvent(new Event('savings-updated'));
        }
    }
</script>

<template>
    <div
        class="block w-3/4 mx-auto mb-5 p-3 bg-gray-200 border border-gray-300 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="flex justify-between font-bold tracking-tight dark:text-white">
            <div>
                <div class="text-2xl text-gray-700 dark:text-gray-300 mb-1">
                    <span>{{ props.name.charAt(0).toUpperCase() + props.name.slice(1) }}</span>
                </div>
                <div class="text-md text-gray-700 dark:text-gray-300 mb-1">
                    <span>Amount: {{ props.total }} {{ props.code }}</span>
                    <span class="ml-2 text-gray-400">({{ props.valuePLN.toFixed(2) }} PLN)</span>
                </div>
                <div class="text-md text-gray-700 dark:text-gray-300">
                    Exchange Rate: {{ props.exchangeRate.toFixed(2) }}
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <div title="Edit" @click="toggleModal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor"
                         class="w-6 h-6 text-sky-400 hover:text-sky-500 cursor-pointer hover:fill-sky-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                    </svg>
                </div>

                <div title="Delete" @click="deleteItem">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor"
                         class="w-6 h-6 text-red-400 hover:text-red-500 cursor-pointer hover:fill-red-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <EditSavingForm :data="newData"/>

        <template v-slot:button>
            <button @click="updateSaving"
                    class="text-black dark:text-gray-200 mt-8 bg-sky-300 hover:bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-400 rounded-md py-2 px-6">
                Save
            </button>
        </template>
    </BaseModal>
</template>

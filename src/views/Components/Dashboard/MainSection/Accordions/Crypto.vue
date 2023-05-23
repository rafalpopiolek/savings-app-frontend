<script setup>

</script>

<template>
    <h2 id="crypto-accordion">
        <button type="button"
                class="flex items-center justify-between w-full p-5 bg-white dark:bg-gray-800 rounded-sm font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                data-accordion-target="#crypto-accordion-arrow" aria-expanded="false"
                aria-controls="crypto-accordion-arrow">
            <span>Cryptocurrencies</span>
            <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path>
            </svg>
        </button>
    </h2>

    <div id="crypto-accordion-arrow" class="hidden bg-gray-100 dark:bg-gray-600"
         aria-labelledby="crypto-accordion">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-300">
                Bitcon: xxx
            </p>
            <p class="text-gray-500 dark:text-gray-300">
                Ethereum: xxx
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['store', 'meta'])
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- Help text -->
    <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing <span class="font-semibold text-gray-900 ">{{ props.meta.current_page }}</span> to <span class="font-semibold text-gray-900 ">{{ props.meta.last_page }}</span> of <span class="font-semibold text-gray-900 ">{{ props.meta.total }}</span> Entries
    </span>
    <!-- Buttons -->
    <div class="inline-flex mt-2 xs:mt-0">
      <button
        class="px-4 py-2 text-sm font-medium  bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        @click="store.prevPage()"
      >
        Prev
      </button>
      <button
        class="px-4 py-2 text-sm font-medium  bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 "
        @click="store.nextPage()"
      >
        Next
      </button>
    </div>
  </div>
</template>

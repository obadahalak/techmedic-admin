<script setup>
const props = defineProps(['mode', 'store'])
</script>

<template>
  <form>
    <div class="h-screen grid place-items-center  mx-auto lg:w-1/3  px-5 ">
      <div class="bg-gray-700 rounded-md shadow-gray-400 shadow-lg  p-8  text-white">
        <h1 class="text-lg font-bold">
          {{ props.mode }}
        </h1>
        <div
          v-if="store.error?.length > 0"
          class="bg-white border-rose-500 border-2 p-5 rounded-md m-4"
        >
          <li
            v-for="error in store.error"

            class="mt-2 text-sm text-red-600 "
          >
            {{ error }}
          </li>
        </div>
        <slot name="inputs" />
      </div>
    </div>
  </form>
</template>

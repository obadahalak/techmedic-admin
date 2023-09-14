<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['keys'])
const columns = ref()
const remove_columns = []
onMounted(() => {
  columns.value = Object.keys(props.keys)

  const regex = new RegExp(/_id/)

  columns.value.forEach((col) => {
    const findIt = regex.test(col)
    if (findIt)
      remove_columns.push(col)
  })
  columns.value = columns.value.filter(key => !remove_columns.includes(key))
})
</script>

<template>
  <div class="mx-2 rounded-md relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr class="  bg-gray-900 text-white">
          <th
            v-for="col in columns"
            scope="col"
            class=" text-center px-6 py-3"
          >
            {{ col }}
          </th>

          <th
            scope="col"
            class="text-center mx-auto font-bold px-6 py-3"
          >
            actions
          </th>
        </tr>
      </thead>
      <tbody class="text-center ">
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>

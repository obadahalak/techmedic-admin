<script setup>
import { onMounted, ref } from 'vue'
import { useBanner } from '@/stores/admin/banner'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseModal from '@/components/base/BaseModal.vue'

const bannerStore = useBanner()

const columns = ref()
const showModal = ref(false)
const type = ref()
onMounted(() => {
  columns.value = ref(bannerStore.data)
})

function showBaseModal(id, getType) {
  type.value = getType

  bannerStore.get(id)

  showModal.value = true
}

function submit() {
  bannerStore.destroy().then((response) => {
    if (!response.errors)
      showModal.value = false
  })
}
</script>

<template>
  <div v-if="bannerStore.data.length > 0">
    <BaseModal
      id="BaseModal"
      class="z-20 fixed  bg-red-700 "
      :class="{ hidden: !showModal }"
      :status="showModal"
      title="banner"
      :type="type"
      :store="bannerStore"
    >
      <template #form>
        <form class="flex flex-col">
          <p
            v-if="type === 'delete'"
            class="text-center"
          >
            do you want to delete
            <span class="text-lg font-bold" /> banner
          </p>
        </form>
      </template>
      <template #btn_from>
        <button
          type="button"
          :class="{ 'bg-red-600 hover:bg-red-500': type === 'delete' }"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          @click="submit"
        >
          delete
        </button>
      </template>
    </BaseModal>

    <BaseTable :keys="bannerStore.data[0]">
      <template #body>
        <tr
          v-for="data in bannerStore.data"
          :key="data.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.id }}
          </th>

          <td class="px-6 py-4 flex">
            <img
              class="lg:w-60 lg:h-60 w-20 mx-auto"
              :src="`${data.src}`"
              alt=""
            >
          </td>

          <td class="px-6 py-4  ">
            <button
              class=" lg:mx-4 mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 w-20 my-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              @click="showBaseModal(data.id, 'delete')"
            >
              delete
            </button>
          </td>
        </tr>
      </template>
    </BaseTable>
  </div>
</template>

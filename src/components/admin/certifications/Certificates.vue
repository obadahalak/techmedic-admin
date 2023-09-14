<script setup>
import { onMounted, ref } from 'vue'
import BaseTable from '../../base/BaseTable.vue'
import { useCertificate } from '../../../stores/admin/certificate'
import BasePagination from '@/components/base/BasePagination.vue'
import BaseModal from '@/components/base/BaseModal.vue'

const certificateStore = useCertificate()
const type = ref()
const columns = ref()
const showModal = ref(false)
onMounted(() => {
  columns.value = ref(certificateStore.data)
})
function showBaseModal(id, getType) {
  type.value = getType
  certificateStore.get(id)
  showModal.value = !showModal.value
}

function destroy() {
  certificateStore.destroy().then((response) => {
    if (!response.errors)
      showModal.value = false
  })
}
</script>

<template>
  <div v-if="certificateStore.data.length > 0">
    <BaseModal
      :class="{ hidden: !showModal }"
      :status="showModal"
      :type="type"
      :store="certificateStore"
      mode="company"
    >
      <template #form>
        <form class="flex flex-col">
          <p
            v-if="type === 'delete'"
            class="text-center"
          >
            do you want to delete
            <span class="text-lg font-bold"> {{ certificateStore.item.title }}</span> certificate
          </p>
        </form>
      </template>
      <template #btn_from>
        <button
          type="button"
          :class="{ 'bg-red-600 hover:bg-red-500': type === 'delete' }"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          @click="destroy"
        >
          {{ type }}
        </button>
      </template>
    </BaseModal>

    <BaseTable :keys="certificateStore.data[0]">
      <template #body>
        <tr
          v-for="data in certificateStore.data"
          :key="data.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.id }}
          </th>
          <td class="px-6 py-4">
            {{ data.title }}
          </td>
          <td class="px-6 py-4 flex">
            <img
              class="lg:w-60 lg:h-60 w-20 mx-auto"
              :src="`${data.image}`"
              alt=""
            >
          </td>
          <td class="px-6 py-4">
            {{ data.description }}
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

    <div class="flex justify-center my-10">
      <BasePagination
        :store="certificateStore"
        :meta="certificateStore.meta"
      />
    </div>
  </div>
</template>

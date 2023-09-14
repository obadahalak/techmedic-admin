<script setup>
import { onMounted, ref } from 'vue'
import { useCompany } from '../../../stores/admin/company'
import BaseTable from '../../base/BaseTable.vue'
import BasePagination from '@/components/base/BasePagination.vue'
import BaseModal from '@/components/base/BaseModal.vue'

const companyStore = useCompany()

const initialForm = {
  logo: '',
  name: '',
}
const form = ref({
  logo: '',
  name: '',
})
const type = ref()
const columns = ref()
const showModal = ref(false)

onMounted(() => {
  columns.value = ref(companyStore.data)
})

function showBaseModal(id, getType) {
  type.value = getType

  companyStore.get(id)

  showModal.value = !showModal.value
}
function edit() {
  companyStore.edit(form.value).then((response) => {
    if (!response.errors)
      showModal.value = false
    Object.assign(form.value, initialForm)
  })
}

function destroy() {
  companyStore.destroy().then((response) => {
    if (!response.errors)
      showModal.value = false
  })
}
</script>

<template>
  <div v-if="companyStore.data.length > 0">
    <BaseModal
      :class="{ hidden: !showModal }"
      :status="showModal"
      :type="type"
      mode="company"
      :store="companyStore"
    >
      <template #form>
        <form class="flex flex-col">
          <p
            v-if="type === 'delete'"
            class="text-center"
          >
            do you want to delete
            <span class="text-lg font-bold"> {{ companyStore.item.name }}</span> company
          </p>

          <div v-if="type === 'edit'">
            <div class="mb-4">
              <label
                for="name"
                class="block text-gray-700 font-bold mb-2"
              >Name:</label>
              <input
                v-model="form.name"
                :placeholder="companyStore.item.name"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3
                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
            </div>

            <div class="mb-4">
              <label
                for="logo"
                class="block text-gray-700 font-bold mb-2"
              >Logo:</label>
              <input
                type="file"
                class="upload_image"
                placeholder="upload new logo"
                @change="(e) => form.logo = e.target.files[0]"
              >
            </div>
          </div>
        </form>
      </template>
      <template #btn_from>
        <button
          type="button"
          :class="{ 'bg-red-600 hover:bg-red-500': type === 'delete' }"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          @click="type !== 'delete' ? edit() : destroy()"
        >
          {{ type }}
        </button>
      </template>
    </BaseModal>

    <BaseTable :keys="companyStore.data[0]">
      <template #body>
        <tr
          v-for="data in companyStore.data"
          :key="data.id"
          class="bg-slate-100 border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.id }}
          </th>
          <td class="px-6 py-4">
            {{ data.name }}
          </td>
          <td class="px-6 py-4 flex">
            <img
              class="lg:w-60 lg:h-60 w-20 mx-auto mx-auto"
              :src="`${data.logo}`"
              alt=""
            >
          </td>

          <td class="px-6 py-4  ">
            <button
              class="lg:mx-4 mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 w-20 my-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              @click="showBaseModal(data.id, 'edit')"
            >
              edit
            </button>
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
        :store="companyStore"
        :meta="companyStore.meta"
      />
    </div>
  </div>
</template>

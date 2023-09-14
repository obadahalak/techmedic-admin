<script setup>
import { onMounted, ref } from 'vue'
import { useProduct } from '@/stores/admin/product'
import BaseTable from '@/components/base/BaseTable.vue'
import BasePagination from '@/components/base/BasePagination.vue'
import BaseModal from '@/components/base/BaseModal.vue'

const productStore = useProduct()

const type = ref()
const columns = ref()
const showModal = ref()
const price = ref()

onMounted(() => {
  columns.value = ref(productStore.data)
})

function showBaseModal(id, getType) {
  type.value = getType

  productStore.get(id)

  showModal.value = !showModal.value
}

function edit() {
  productStore.edit(price.value).then((response) => {
    if (!response.errors)
      showModal.value = false
  })
}
function destroy() {
  productStore.destroy()
}
</script>

<template>
  <div v-if="productStore.data.length > 0">
    <BaseModal
      :class="{ hidden: !showModal }"
      :status="showModal"
      :type="type"
      mode="product"
      :store="productStore"
    >
      <template #form>
        <form class="flex flex-col">
          <p
            v-if="type === 'delete'"
            class="text-center"
          >
            do you want to delete
            <span class="text-lg font-bold"> {{ productStore.item.name }}</span> company
          </p>

          <div v-if="type === 'edit'">
            <div class="mb-4">
              <label
                for="name"
                class="block text-gray-700 font-bold mb-2"
              >price:</label>
              <input
                v-model="price"
                :placeholder="productStore.item.price"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3
                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

    <BaseTable :keys="productStore.data[0]">
      <template #body>
        <tr
          v-for="data in productStore.data"
          :key="data.id"
          class="bg-white border-b overflow-x-auto dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
          <td class="px-6 py-4 max-h-40 overflow-y-auto max-w-sm">
            {{ data.description }}
          </td>

          <td class="px-6 py-4">
            {{ data.price }}
          </td>
          <td class="px-6 py-4 w-72 lg:h-44 h-64  flex">
            <img
              class="  mx-auto"
              :src="`${data.image}`"
              alt=""
            >
          </td>
          <td class="px-6 py-4">
            {{ data.category }}
          </td>
          <td class="px-6 py-4">
            {{ data.company }}
          </td>

          <td class="px-6 py-4">
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
        :store="productStore"
        :meta="productStore.meta"
      />
    </div>
  </div>
</template>

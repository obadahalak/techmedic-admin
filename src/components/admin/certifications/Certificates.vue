<script setup>

import BaseTable from '../../base/BaseTable.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import BaseModal from '@/components/base/BaseModal.vue'
import { onMounted, ref } from 'vue';
import { useCertificate } from '../../../stores/admin/certificate';

const certificate = useCertificate();
let type = ref();
const columns = ref();
let showModal = ref(false);
onMounted(() => {

  columns.value = ref(certificate.data);
})
function showBaseModal(id, getType) {
  type.value = getType;
  certificate.get(id);
  showModal.value = ! showModal.value;
}
function submit() {


  certificate.delete(certificate.item.id);

  if (certificate.status != 422 || certificate.status != 404) {
    showModal.value = ! showModal.value;

  }

}

</script>
<template>
  <div v-if="certificate.data.length > 0">


    <BaseModal  @chnageStatus="(s)=>showModal=s" :class="{ 'hidden': !showModal }" :status="showModal" :type="type" :mode="'company'">
      <template #form>

        <form class="flex flex-col">

          <p class="text-center" v-if="type == 'delete'">
            do you want to delete
            <span class="text-lg font-bold"> {{ certificate.item.title }}</span> certificate
          </p>



        </form>

      </template>
      <template #btn_from>
        <button type="button" :class="{ 'bg-red-600 hover:bg-red-500': type == 'delete' }"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          @click="submit">{{ type }}</button>
      </template>
    </BaseModal>


    <BaseTable :keys="certificate.data[0]">

      <template #body>

        <tr v-for="data in certificate.data"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ data.id }}
          </th>
          <td class="px-6 py-4">
            {{ data.title }}
          </td>
          <td class="px-6 py-4 flex">
            <img class="lg:w-60 lg:h-60 w-20 mx-auto" :src="`${data.image}`" alt="">


          </td>
          <td class="px-6 py-4">
            {{ data.description }}
          </td>


          <td class="px-6 py-4  ">


            <button @click="showBaseModal(data.id, 'delete')"
              class=" lg:mx-4 mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 w-20 my-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button">
              delete
            </button>
          </td>

        </tr>

      </template>
    </BaseTable>

    <div class="flex justify-center my-10">
      <BasePagination :store="certificate" :meta="certificate.meta" />
    </div>


  </div>
</template>
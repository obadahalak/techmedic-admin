<script setup>
import BaseTable from '../../base/BaseTable.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import { edit } from '@/composables/product/edit.js'
import BaseModal from '@/components/base/BaseModal.vue'
import { onMounted, ref } from 'vue';
import { useProduct } from '../../../stores/admin/product';

const product = useProduct();

let type = ref();
const columns = ref();

onMounted(() => {
   columns.value = ref(product.data);
});


function showBaseModal(id, getType) {

   type.value = getType;

   product.get(id);


   document.getElementById('modal').classList.remove('hidden');
}

function submit() {
    if (type.value == 'edit') {
        edit();

        if (product.status != 422 || product.status != 404) {

            document.getElementById('BaseModal').classList.add('hidden');
        }
    } else {
        product.delete(product.item.id);

        if (product.status != 422 || product.status != 404) {

            document.getElementById('BaseModal').classList.add('hidden');
        }

    }

}

</script>
<template>
   <div v-if="product.data.length > 0">

      <BaseModal class="z-20 fixed  " :type="type" :mode="'product'">
         <template #form>

            <form class="flex flex-col">

               <p class="text-center" v-if="type == 'delete'">
                  do you want to delete
                  <span class="text-lg font-bold"> {{ product.item.name }}</span> company
               </p>


               <div v-if="type == 'edit'">
                  <div class="mb-4">

                     <label for="name" class="block text-gray-700 font-bold mb-2">price:</label>
                     <input type="text" v-model="product.item.price" class="shadow appearance-none border rounded w-full py-2 px-3
                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  </div>


               </div>

            </form>

         </template>
         <template #btn_from>
            <button type="button" :class="{ 'bg-red-600 hover:bg-red-500': type == 'delete' }"
               class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
               @click="submit">{{ type }}</button>
         </template>
      </BaseModal>

      <BaseTable :keys="product.data[0]">

         
         <template #body>

            
            <tr v-for="data in product.data"
               class="bg-white border-b overflow-x-auto dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

               <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                 
                  <img class="  mx-auto" :src="`${data.image}`" alt="">
               </td>
               <td class="px-6 py-4">
                  {{ data.category }}
               </td>
               <td class="px-6 py-4">
                  {{ data.company }}
               </td>


               <td class="px-6 py-4">

                  <button @click="showBaseModal(data.id, 'edit')"
                     class="lg:mx-4 mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 w-20 my-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                     type="button">
                     edit
                  </button>
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
         <BasePagination :store="product" :meta="product.meta" />
      </div>


   </div>
</template>
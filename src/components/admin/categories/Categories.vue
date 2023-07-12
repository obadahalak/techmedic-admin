<script setup>
import { useCategory } from '../../../stores/admin/category';

import { useCompany } from '../../../stores/admin/company';
import {edit} from '@/composables/category/edit.js';
import BaseTable from '../../base/BaseTable.vue';
import pagination from '@/components/base/pagination.vue';
import modal from '@/components/base/modal.vue'
import { onMounted, ref } from 'vue';

const category = useCategory();
let type = ref();
const columns = ref();
onMounted(() => {

    columns.value = ref(category.data);
})
function showModal(id, getType) {
    type.value = getType;
    category.get(id);
    window.scrollTo(0, 0);
    document.getElementById('modal').classList.remove('hidden');
}
function submit() {

    if (type.value == 'edit') {
        edit();

        if (category.status != 422 || category.status != 404) {

            document.getElementById('modal').classList.add('hidden');
        }
    } else {
        category.delete(category.item.id);

        if (category.status != 422 || category.status != 404) {

            document.getElementById('modal').classList.add('hidden');
        }

    }

}

</script>
<template>
    <div v-if="category.data.length > 0">


        <modal class="z-20 absolute  " :type="type" :mode="'company'">
            <template #form>

                <form class="flex flex-col">

                    <p class="text-center" v-if="type == 'delete'">
                        do you want to delete
                        <span class="text-lg font-bold"> {{ category.item.category_name }}</span> company
                    </p>


                    <div v-if="type == 'edit'">
                        <div class="mb-4">

                            <label for="name" class="block text-gray-700 font-bold mb-2">Name:</label>
                          
                            <input type="text" v-model="category.item.category_name" class="shadow appearance-none border rounded w-full py-2 px-3
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
        </modal>


        <BaseTable :keys="category.data[0]">

            <template #body>

                <tr v-for="data in category.data"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ data.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ data.category_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ data.company_name }}
                    </td>


                    <td class="px-6 py-4 flex justify-center ">

                        <button @click="showModal(data.id, 'edit')"
                            class="lg:mx-4 mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 w-20 my-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button">
                            edit
                        </button>
                        <button @click="showModal(data.id, 'delete')"
                            class=" lg:mx-4 mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 w-20 my-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button">
                            delete
                        </button>
                    </td>

                </tr>

            </template>
        </BaseTable>

        <div class="flex justify-center my-10">
            <pagination :store="category" :meta="category.meta" />
        </div>


    </div>
</template>
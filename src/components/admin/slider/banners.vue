<script setup>

import BaseTable from '../../base/BaseTable.vue';
import BaseModal from '@/components/base/BaseModal.vue'
import { onMounted, ref } from 'vue';
import { useBanner } from '../../../stores/admin/banner';

const baseImageUrl = import.meta.env.VITE_BASE_URL_IMAGE;
const banner = useBanner();

const columns = ref();
let showModal=ref(false);
let type=ref();
onMounted(() => {
    columns.value = ref(banner.data);
});


function showBaseModal(id,getType) {

    type.value=getType;

    banner.get(id);

    showModal.value=true;
}

function submit() {

    banner.delete(banner.item.id);

    if (banner.status != 422 || banner.status != 404) {

        showModal.value=false;
        
    }

}

</script>
<template>
 
    <div v-if="banner.data.length > 0">

        <BaseModal id="BaseModal" class="z-20 fixed  bg-red-700 " :class="{'hidden':!showModal}" :status="showModal"  :title="'banner'" :type="type" >
            <template #form>

                <form class="flex flex-col">

                    <p class="text-center" v-if="type == 'delete'">
                        do you want to delete
                        <span class="text-lg font-bold"> </span> banner
                    </p>

                </form>

            </template>
            <template #btn_from>
                <button type="button" :class="{ 'bg-red-600 hover:bg-red-500': type == 'delete' }"
                    class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    @click="submit">delete</button>
            </template>
        </BaseModal>


        <BaseTable :keys="banner.data[0]">

            <template #body>

                <tr v-for="data in banner.data"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ data.id }}
                    </th>

                    <td class="px-6 py-4 flex">
                        <img class="lg:w-60 lg:h-60 w-20 mx-auto" :src="`${data.image}`" alt="">
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




    </div>
</template>
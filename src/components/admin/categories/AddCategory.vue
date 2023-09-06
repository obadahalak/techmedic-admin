<script setup>
import { useCategory } from "../../../stores/admin/category";
import { useCompany } from "../../../stores/admin/company";
import { isEmpty } from '@/composables/isEmpty.js'
import addForm from "../../base/AddForm.vue";
import BaseInput from "../../base/BaseInput.vue";
import { ref } from "vue";
const category = useCategory();
const companyStore = useCompany();

let name = ref();

let company_id = ref();


function save() {
    
    if (!isEmpty(company_id.value)) {


        category.store({
            'name': name.value,
            'company_id': company_id.value,
        });
        name.value=null;
        company_id.value="def";
        // document.getElementById('form').(); 
    }


}

</script>
<template>
    <div class="">
        <addForm :store="category" :mode="'category'">
            <template #inputs>
                <form id="form" @submit.prevent="save">
                    <div class="my-10">
                        <BaseInput :type="'input'" v-model="name" :label="'enter company name'" />

                    </div>
                    <div class="my-10">
                        <BaseInput :type="'select'" v-model="company_id" :label="'select Company:'"
                            :data="companyStore.data" />
                    </div>

                    <div>
                        <button type="submit" class="p-2 w-full bg-gray-900 text-white rounded-md">Save</button>
                    </div>
                </form>
            </template>
        </addForm>

    </div>
</template>
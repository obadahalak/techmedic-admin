<script setup>
import { useCategory } from "../../../stores/admin/category";
import { useCompany } from "../../../stores/admin/company";

import addForm from "../../base/AddForm.vue";
import { isEmpty } from '@/composables/isEmpty.js'
import { ref } from "vue";
const category = useCategory();
const companyStore = useCompany();

let name = ref();

let company_id = ref();


function save() {

    let data = new FormData();
    if (!isEmpty(name.value) && !isEmpty(company_id.value)) {

        data.append('name', name.value);
        data.append('company_id', company_id.value);

        category.store(data);
        document.getElementById('form').reset();
    }
}
</script>
<template>
    <div class="">
        <addForm :store="category" :mode="'category'">
            <template #inputs>
                <form id="form" @submit.prevent="save">
                    <div class="my-10">
                        <p>catgory name:</p>
                    <input class="mt-2 w-full rounded-md " type="text" v-model="name" placeholder="enter company name">
                </div>
                <div class="my-10">
                    <p> select Category: </p>
                    <select class="mt-2 w-full rounded-md" v-model="company_id">
                        <option class="p-2 bg-slate-50 border-2 " :value="company.id" v-for="company in companyStore.data">
                           <span >  {{ company.name }}</span>
                        </option>
                    </select>
                </div>

                <div>
                    <button type="submit" class="p-2 w-full bg-gray-900 text-white rounded-md">Save</button>
                </div>
            </form>
            </template>
        </addForm>

    </div>
</template>
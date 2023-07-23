<script setup>
import addForm from "../../base/AddForm.vue";
import { onMounted, ref } from "vue";
import { isEmpty } from '@/composables/isEmpty.js'
import { useProduct } from "../../../stores/admin/product";
import { useCategory } from "../../../stores/admin/category";
import { useCompany } from "../../../stores/admin/company";
import BaseInput from "../../base/BaseInput.vue";
const productStore = useProduct();

const categoryStore = useCategory();

const companyStore = useCompany();

let images = ref([]);
let name = ref();
let description = ref();
let price = ref();

let company_id = ref();
let category_id = ref();

function uploadImage(event) {
    images.value = event.target.files;
}
function save() {

    let form = new FormData();


        Array.from(images.value).forEach(file => {
            form.append('images[]', file);
        });

     
        productStore.store({
            'name': name.value,
            'price': price.value,
            'description': description.value,
            'category_id': category_id.value,
            'company_id': company_id.value,
            'images':form.getAll('images[]'),
        });
        document.getElementById('form').reset();
    }
function getCategories(event) {
    categoryStore.all(event.target.value);
}

</script>
<template>
    <div class="">
        <addForm :store="productStore" mode="product">
            <template #inputs>

                <form id="form" @submit.prevent="save">
                    <div class="my-6 flex justify-center gap-5">
                        <div>
                            <BaseInput :type="'input'" type="text" v-model="name" :label="' name'" />


                        </div>

                        <div>
                            <BaseInput :type="'input'" type="number" v-model="price" :label="' price'" />
                        </div>
                    </div>
                    <div class="my-6">
                        <div>

                            <BaseInput :type="'input'" type="text" v-model="description" :label="' product description'" />
                        </div>
                    </div>

                    <div class="my-6 flex gap-5">


                        <div class="w-full">

                            <BaseInput :type="'select'" v-model="company_id" :label="'select Company:'"
                                :data="companyStore.data" @input="getCategories" />

                        </div>

                        <div class="w-full">


                            <BaseInput :type="'select'" v-model="category_id" :label="'select Category:'"
                                :data="categoryStore.data" />

                        </div>


                    </div>
                    <div class="my-6">
                        <p> images:</p>
                        <input class="p-2 rounded-md w-1/2" id="image" multiple @change="uploadImage" type="file">
                    </div>

                    <div>
                        <button type="submit" class="p-2 w-full bg-gray-900 text-white rounded-md">Save</button>
                    </div>
                </form>
            </template>
        </addForm>

    </div>
</template>
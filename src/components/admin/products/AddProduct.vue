<script setup>
import addForm from "../../base/AddForm.vue";
import { ref } from "vue";
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

    if (!isEmpty(name.value) && !isEmpty(images.value)
        && !isEmpty(description.value) && !isEmpty(price.value)
        && !isEmpty(category_id.value) && !isEmpty(company_id.value)) {

        Array.from(images.value).forEach(file => {
            form.append('images[]', file);
        });

        form.append('name', name.value);
        form.append('price', price.value);
        form.append('description', description.value);
        form.append('category_id', category_id.value);
        form.append('company_id', company_id.value);

        productStore.store(form);
        document.getElementById('form').reset();  
    }
}
</script>
<template>
    <div class="">
        <addForm :store="productStore" mode="product">
            <template #inputs>

                <form id="form" @submit.prevent="save">
                    <div class="my-6 flex justify-center gap-5">
                        <div>
                            <BaseInput 
                            type="text" 
                            v-model="name" 
                            :label="'enter the name'" 
                          
                            />
                        
                  
                    </div>

                    <div>
                        <BaseInput 
                            type="number" 
                            v-model="price" 
                            :label="'enter the price'" 
                            />
                    </div>
                </div>
                <div class="my-6">
                    <div>
                        
                        <BaseInput 
                            type="text" 
                            v-model="description" 
                            :label="'enter the product description'" 
                            />
                    </div>
                </div>

                <div class="my-6 flex gap-5">
                    <div class="w-full">
                        
                        <p> select Category: </p>
                        <select class="p-2 mt-2 w-full rounded-md " v-model="category_id">
                            
                            <option  class="p-2 bg-slate-50 border-2 " :value="category.id"
                            v-for="category in categoryStore.data">
                            {{ category.category_name }}
                            </option>
                        </select>
                    </div>

                    <div class="w-full">
                        
                        <p> select Company: </p>
                        <select class="p-2 mt-2 w-full rounded-md " v-model="company_id">
                            <option class="p-2  bg-slate-50 border-2 " :value="company.id"
                            v-for="company in companyStore.data">
                            {{ company.name }}
                        </option>
                    </select>
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
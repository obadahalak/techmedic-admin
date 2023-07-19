<script setup>
import { useCompany } from "../../../stores/admin/company";
import addForm from "../../base/add-form.vue";
import { ref } from "vue";
import { isEmpty } from '@/composables/isEmpty.js'

const company = useCompany();

let image = ref();
let name = ref();
function uploadImage(event) {

    image.value = event.target.files[0];

}
function save() {
        
    let data = new FormData();
   
    
    if (!isEmpty(name.value) && !isEmpty(image.value)) {

        data.append('name', name.value);
        data.append('logo', image.value);
        company.store(data);
    }
    
}
</script>
<template>
    <div class="">
        <addForm :store="useCompany()" mode="company">
            <template #inputs>

                <div class="my-10">
                    <p>company name:</p>
                    <input class="mt-2 w-full rounded-md " type="text" v-model="name"
                        placeholder="enter company name">
                </div>
                <div class="my-10">
                    <p>company image:</p>
                    <input class="p-2 rounded-md w-1/2" id="image" @change="uploadImage" type="file">
                </div>

                <div>
                    <button @click="save" class="p-2 w-full bg-gray-900 text-white rounded-md">Save</button>
                </div>
            </template>
        </addForm>

    </div>
</template>
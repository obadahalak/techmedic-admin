<script setup>

import addForm from "../../base/AddForm.vue";
import {  ref } from "vue";
import { isEmpty } from '@/composables/isEmpty.js'
import { useBanner } from "../../../stores/admin/banner";

const banner = useBanner();

let image = ref([]);


function uploadImage(event) {

    image.value = event.target.files;

}
function save() {

    let data = new FormData();


    if (!isEmpty(image.value)) {
        
      
       Array.from(image.value).forEach(image => {

            data.append('images[]', image);
        });
    }
    banner.store(data);
    document.getElementById('form').reset();  
}
</script>
<template>
    <div class="">
        <addForm :store="banner" mode="banners">
            <template #inputs>
                <form id="form" @submit.prevent="save">
                    
                    <div class="my-10">
                    <p>banner images:</p>
                    <input multiple class="p-2 rounded-md w-1/2" id="image" @change="uploadImage" type="file">
                </div>

                <div>
                    <button type="submit" class="p-2 w-full bg-gray-900 text-white rounded-md">Save</button>
                </div>
            </form>
            </template>
        </addForm>

    </div>
</template>
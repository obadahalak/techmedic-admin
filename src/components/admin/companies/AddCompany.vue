<script setup>
import { useCompany } from "../../../stores/admin/company";
import addForm from "../../base/AddForm.vue";
import BaseInput from '../../base/BaseInput.vue'
import { ref } from "vue";

const company = useCompany();

let image = ref();
let name = ref();

function uploadImage(event) {

    image.value = event.target.files[0];

}
function save() {

    company.store({
        'name': name.value,
        'logo': image.value,
    });

    document.getElementById('form').reset();

}
</script>
<template>
    <div class="">
        <addForm :store="useCompany()" mode="company">
            <template #inputs>
                <form id="form" @submit.prevent="save">

                    <div class="my-10">

                        <BaseInput :type="'input'" type="text" :label="'company name:'" v-model="name" />

                    </div>
                    <div class="my-10">

                        <input type="file" class="upload_image" @change="uploadLogo"
                            placeholder="upload new logo">

                    </div>
                    <div class="my-10">
                        <p>company image:</p>
                        <input class="p-2 rounded-md w-1/2" id="image" @change="uploadImage" type="file">
                    </div>

                    <div>
                        <button type="submit" class="p-2 w-full bg-gray-900 text-white rounded-md">Save</button>
                    </div>
                </form>
            </template>
        </addForm>

    </div>
</template>
<script setup>
import { useCertificate } from "../../../stores/admin/certificate";
import addForm from "../../base/add-form.vue";
import { ref } from "vue";
import { isEmpty } from '@/composables/isEmpty.js'
const certificate = useCertificate();

let image = ref();
let title = ref();
let description = ref();

function uploadImage(event) {

    image.value = event.target.files[0];

}

function save() {
    let data = new FormData();

    if (!isEmpty(title.value) && !isEmpty(image.value ) && !isEmpty(description.value )) {
        data.append('title', title.value);
        data.append('image', image.value);
        data.append('description', description.value);
        certificate.store(data);
    }
}
</script>
<template>
    <div class="">
        <addForm :store="certificate" mode="certificate">
            <template #inputs>

                <div class="my-10">
                    <p> title:</p>
                    <input class="mt-2 w-full rounded-md " type="text" v-model="title" placeholder="enter  name">
                </div>
                <div class="my-10">
                    <p> descrption:</p>
                    <input class="mt-2 w-full rounded-md " type="text" v-model="description"
                        placeholder="enter descrption ">
                </div>
                <div class="my-10">
                    <p> image:</p>
                    <input class="p-2 rounded-md w-1/2" id="image" @change="uploadImage" type="file">
                </div>

                <div>
                    <button @click="save" class="p-2 w-full bg-gray-900 text-white rounded-md">Save</button>
                </div>
            </template>
        </addForm>

    </div>
</template>
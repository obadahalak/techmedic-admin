<script setup>
import { useAuth } from "@/stores/admin/auth";
import addForm from "@/components/base/add-form.vue";
import { isEmpty } from '@/composables/isEmpty.js'
import { ref } from "vue";
const auth = useAuth();


let email = ref(localStorage.getItem('email'));

let password = ref();



function save() {

    let data = new FormData();
  
    if (!isEmpty(email.value)) {

        data.append('email', email.value);
    }
    if (!isEmpty(password.value)) {

        data.append('password', password.value);
    }
    auth.update(data);
}
</script>
<template>
    <div class="">
        <addForm :store="auth" :mode="'update-profile'">
            <template #inputs>

                <div class="my-10">
                    <p>email:</p>
                    <input class="mt-2 w-full rounded-md " type="text" v-model="email" placeholder="enter your  email">
                </div>

                <div class="my-10">
                    <p>password:</p>
                    <input class="mt-2 w-full rounded-md " type="password" v-model="password"
                        placeholder="enter your  password">
                </div>

                <div>
                    <button @click="save" class="p-2 w-full bg-gray-900 text-white rounded-md">Save</button>
                </div>
            </template>
        </addForm>

    </div>
</template>
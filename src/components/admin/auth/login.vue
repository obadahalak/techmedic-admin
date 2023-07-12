<script setup>
import { ref } from "vue";
import { useAuth } from '@/stores/admin/auth.js';
let email = ref('');

let password = ref('');
const Auth = useAuth();
function login() {

    Auth.login({
        'email': email.value,
        'password': password.value,
    });
}
</script>

<template>
    <div class="h-screen grid  grid-items-center place-items-center    ">

        <div
            class="bg-gray-700   text-white  space-y-5 card-border  shadow-gray-400 shadow-lg p-6  lg:w-4/12  text-center mb-4 ">


            <h1 class="text-left text-lg font-bold py-4">Admin login</h1>
            <p v-if="Auth.error"  v-for="error in Auth.error" class=" text-center m-1 text-red-600">{{ error }}</p>

            <div>

                <input class="w-full p-2 rounded-md border   text-black" placeholder="enter your email" type="text" v-model="email">

            </div>

            <div>

                <input class="w-full p-2 rounded-md border  text-black" placeholder="enter your password" type="text" v-model="password">
            </div>
            <div>

                <button @click="login" class="p-2 rounded-md border-2 w-1/2 hover:bg-gray-800">Login</button>

            </div>
        </div>
    </div>
</template>

<style  scoped>
.card-border {
    border-top-right-radius: 2rem;

    border-bottom-left-radius: 2rem;
}
</style>
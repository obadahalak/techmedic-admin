<script setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/admin/auth.js'

const authStore = useAuth()

const email = ref('')
const password = ref('')

function login() {
  authStore.login({
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <div class="h-screen grid  grid-items-center place-items-center    ">
    <div
      class="bg-gray-700   text-white  space-y-5 card-border  shadow-gray-400 shadow-lg p-6  lg:w-4/12  text-center mb-4 "
    >
      <h1 class="text-left text-lg font-bold py-4">
        Admin login
      </h1>
      <div
        v-if="authStore.error"
        class="bg-white border-rose-500 border-2 p-5 rounded-md m-4"
      >
        <li
          v-for="error in authStore.error"

          class="mt-2 text-start text-sm text-red-600 "
        >
          {{ error }}
        </li>
      </div>

      <div>
        <input
          v-model="email"
          class="w-full p-2 rounded-md border   text-black"
          placeholder="enter your email"
          type="text"
          required
        >
      </div>

      <div>
        <input
          v-model="password"
          type="password"
          class="w-full p-2 rounded-md border  text-black"
          placeholder="enter your password"
          required
        >
      </div>
      <div>
        <button
          class="p-2 rounded-md border-2 w-1/2 hover:bg-gray-800"
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

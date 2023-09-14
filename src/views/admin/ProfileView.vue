<script setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/admin/auth.js'
import BaseInput from '@/components/base/BaseInput.vue'
import AddForm from '@/components/base/AddForm.vue'

const authStore = useAuth()

const authForm = ref({
  email: '',
  password: '',
})

function save() {
  authStore.update(authForm.value)
}
</script>

<template>
  <div class="">
    <AddForm
      :store="authStore"
      mode="update-profile"
      @submit.prevent="save"
    >
      <template #inputs>
        <div class="my-10">
          <BaseInput
            v-model="authForm.email"
            type="input"
            label="update your email"
          />
        </div>

        <div class="my-10">
          <BaseInput
            v-model="authForm.password"
            type="input"
            label="update your password"
          />
        </div>

        <div>
          <button
            class="p-2 w-full bg-gray-900 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </template>
    </AddForm>
  </div>
</template>

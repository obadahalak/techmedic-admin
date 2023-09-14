<script setup>
import { ref } from 'vue'

import { useCompany } from '@/stores/admin/company.js'
import BaseInput from '@/components/base/BaseInput.vue'

import AddForm from '@/components/base/AddForm.vue'

const company = useCompany()

const image = ref()
const name = ref()

function uploadImage(event) {
  image.value = event.target.files[0]
}
function save() {
  company.store({
    name: name.value,
    logo: image.value,
  })

  document.getElementById('form').reset()
}
</script>

<template>
  <div class="">
    <AddForm
      :store="useCompany()"
      mode="company"
    >
      <template #inputs>
        <form
          id="form"
          @submit.prevent="save"
        >
          <div class="my-10">
            <BaseInput
              v-model="name"
              type="text"
              label="company name:"
            />
          </div>

          <div class="my-10">
            <p>company image:</p>
            <input
              id="image"
              class="p-2 rounded-md w-1/2"
              type="file"
              @change="uploadImage"
            >
          </div>

          <div>
            <button
              type="submit"
              class="p-2 w-full bg-gray-900 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </template>
    </AddForm>
  </div>
</template>

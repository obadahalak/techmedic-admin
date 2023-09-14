<script setup>
import { ref } from 'vue'
import { useCertificate } from '@/stores/admin/certificate'
import BaseInput from '@/components/base/BaseInput.vue'
import AddForm from '@/components/base/AddForm.vue'

const certificateStore = useCertificate()

const initialForm = {
  title: '',
  image: '',
  description: '',
}
const certificateForm = ref({
  title: '',
  image: '',
  description: '',
})

function save() {
  certificateStore.store(certificateForm.value).then(() => {
    Object.assign(certificateForm.value, initialForm)
  })
}
</script>

<template>
  <div class="">
    <AddForm
      :store="certificateStore"
      mode="certificate"
    >
      <template #inputs>
        <form

          @submit.prevent="save"
        >
          <div class="my-10">
            <BaseInput
              v-model="certificateForm.title"
              type="input"
              label="enter the title"
            />
          </div>
          <div class="my-10">
            <BaseInput
              v-model="certificateForm.description"
              type="input"
              label="enter the descrption"
            />
          </div>
          <div class="my-10">
            <p> image:</p>
            <input
              class="p-2 rounded-md w-1/2"
              type="file"
              @change="(e) => certificateForm.image = e.target.files[0]"
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

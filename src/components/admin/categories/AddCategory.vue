<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'

import AddForm from '@/components/base/AddForm.vue'
import { useCategory } from '@/stores/admin/category'
import { useCompany } from '@/stores/admin/company'

const category = useCategory()
const companyStore = useCompany()

const name = ref()

const company_id = ref()

function save() {
  category.store({
    name: name.value,
    company_id: company_id.value,
  })
  name.value = null
  company_id.value = 'def'
}
</script>

<template>
  <div class="">
    <AddForm
      :store="category"
      mode="category"
    >
      <template #inputs>
        <form
          id="form"
          @submit.prevent="save"
        >
          <div class="my-10">
            <BaseInput
              v-model="name"
              type="input"
              label="enter company name"
            />
          </div>
          <div class="my-10">
            <BaseInput
              v-model="company_id"
              type="select"
              label="select Company:"
              :data="companyStore.data"
            />
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

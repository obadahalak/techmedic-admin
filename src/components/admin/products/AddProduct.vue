<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'

import AddForm from '@/components/base/AddForm.vue'
import { useProduct } from '@/stores/admin/product'
import { useCategory } from '@/stores/admin/category'
import { useCompany } from '@/stores/admin/company'

const productStore = useProduct()
const categoryStore = useCategory()
const companyStore = useCompany()

const initialForm = {
  name: '',
  price: '',
  description: '',
  category_id: '',
  company_id: '',
  images: '',
}
const productForm = ref({
  name: '',
  price: '',
  description: '',
  category_id: '',
  company_id: '',
  images: '',
})

function save() {
  productStore.store(productForm.value).then((response) => {
    if (!response.errors)
      Object.assign(productForm.value, initialForm)
  })
}
function getCategories(event) {
  categoryStore.all(event.target.value)
}
</script>

<template>
  <div class="">
    <AddForm
      :store="productStore"
      mode="product"
    >
      <template #inputs>
        <form
          id="form"
          @submit.prevent="save"
        >
          <div class="my-6 flex justify-center gap-5">
            <div>
              <BaseInput
                v-model="productForm.name"
                type="text"
                label=" name"
              />
            </div>

            <div>
              <BaseInput
                v-model="productForm.price"
                type="number"
                label=" price"
              />
            </div>
          </div>
          <div class="my-6">
            <div>
              <BaseInput
                v-model="productForm.description"
                type="text"
                label=" product description"
              />
            </div>
          </div>

          <div class="my-6 flex gap-5">
            <div class="w-full">
              <BaseInput
                v-model="productForm.company_id"
                type="select"
                label="select Company:"
                :data="companyStore.data"
                @input="getCategories"
              />
            </div>

            <div class="w-full">
              <BaseInput
                v-model="productForm.category_id"
                type="select"
                label="select Category:"
                :data="categoryStore.data"
              />
            </div>
          </div>
          <div class="my-6">
            <p> images:</p>
            <input
              id="image"
              class="p-2 rounded-md w-1/2"
              multiple
              type="file"
              @change="(e) => productForm.images = e.target.files"
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

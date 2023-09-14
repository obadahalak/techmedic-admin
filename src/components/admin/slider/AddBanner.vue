<script setup>
import { ref } from 'vue'
import AddForm from '@/components/base/AddForm.vue'
import { useBanner } from '@/stores/admin/banner'

const bannerStore = useBanner()

const bannerForm = ref({
  images: '',
})

function save() {
  bannerStore.store(bannerForm.value)
}
</script>

<template>
  <div class="">
    <AddForm
      :store="bannerStore"
      mode="banners"
    >
      <template #inputs>
        <form
          id="form"
          @submit.prevent="save"
        >
          <div class="my-10">
            <p>upload images:</p>

            <input
              id="image"
              multiple
              class="p-2 mt-2 rounded-md upload_image w-1/2"
              type="file"
              @change="(e) => bannerForm.images = e.target.files"
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

<script setup>
import { onMounted } from 'vue'
import Categories from '@/components/admin/categories/Categories.vue'
import AddCategory from '@/components/admin/categories/AddCategory.vue'

import { useCompany } from '@/stores/admin/company.js'

import { useCategory } from '@/stores/admin/category.js'

onMounted(() => {
  useCompany().getAll()
  useCategory().getAll()
})
</script>

<template>
  <AddCategory />

  <Categories />
</template>

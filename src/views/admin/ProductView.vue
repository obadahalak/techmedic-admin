<script setup>
import { onMounted } from 'vue'
import AddProduct from '@/components/admin/products/AddProduct.vue'
import Products from '@/components/admin/products/products.vue'
import { useProduct } from '@/stores/admin/product'
import { useCompany } from '@/stores/admin/company.js'

onMounted(() => {
  useCompany().all()

  useProduct().getAll()
})
</script>

<template>
  <div class="">
    <AddProduct />

    <Products />
  </div>
</template>

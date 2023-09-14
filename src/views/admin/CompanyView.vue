<script setup>
import { onMounted } from 'vue'
import Companies from '@/components/admin/companies/Companies.vue'
import AddCompany from '@/components/admin/companies/AddCompany.vue'

import { useCompany } from '@/stores/admin/company.js'

onMounted(() => {
  useCompany().getAll()
})
</script>

<template>
  <div class="">
    <AddCompany />
    <Companies />
  </div>
</template>

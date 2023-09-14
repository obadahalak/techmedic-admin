<script setup>
import { onMounted } from 'vue'
import { useCertificate } from '@/stores/admin/certificate'
import Certificates from '@/components/admin/certifications/Certificates.vue'
import AddCertificate from '@/components/admin/certifications/AddCertificate.vue'

onMounted(() => {
  useCertificate().getAll()
})
</script>

<template>
  <div class="">
    <AddCertificate />

    <Certificates />
  </div>
</template>

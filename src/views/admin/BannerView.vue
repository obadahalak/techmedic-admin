<script setup>
import { onMounted } from 'vue'
import { useBanner } from '@/stores/admin/banner'
import AddBanner from '@/components/admin/slider/AddBanner.vue'
import Banners from '@/components/admin/slider/Banners.vue'

onMounted(() => {
  useBanner().getAll()
})
</script>

<template>
  <AddBanner />

  <Banners />
</template>

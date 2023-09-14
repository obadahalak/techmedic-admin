<script setup>
import Navbar from './components/admin/header/navbar.vue'
import Loader from '@/components/base/Loader.vue'
</script>

<template>
  <div class="flex flex-col h-screen justify-between ">
    <Navbar />

    <Loader />

    <div class="mb-auto bg-slate-100 ">
      <RouterView />
    </div>
  </div>
</template>

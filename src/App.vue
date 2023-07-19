<script setup>
import navbar from '@/components/admin/header/navbar.vue'
import loader from '@/components/base/loader.vue'

</script>

<template>
  <div class="flex flex-col h-screen justify-between">

    <navbar/>
    
    <loader/>
   
    <div class="mb-auto ">
      
      <RouterView />
    </div>
  </div>
</template>


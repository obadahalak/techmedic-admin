<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = ref([
  {
    name: 'Companies',
    path: '/',
    active: false,
  },
  {
    name: 'Categories',
    path: 'category',
    active: false,
  },
  {
    name: 'Certificates',
    path: 'certificate',
    active: false,
  },
  {
    name: 'Products',
    path: 'product',
    active: false,
  },
  {
    name: 'Banners',
    path: 'banner',
    active: false,
  },
  {
    name: 'Profile',
    path: 'profile',
    active: false,
  },
])

function push(route) {
  routes.value.map((r) => {
    if (r.name === route) {
      router.push(r.path)
      r.active = true
    }
    else { r.active = false }
  })
}
</script>

<template>
  <div>
    <nav
      class="flex  overflow-x-auto lg:justify-around md:justify-around sm:justify-around list-none p-4 border-b-2 border-gray-700 bg-slate-100"
    >
      <li
        v-for="route in routes"
        :class="{ 'bg-gray-700 rounded-md  text-white font-bold': route.path == router.currentRoute.value.name }"
        class=" border-l-md p-2 cursor-pointer hover:text-bold hover:text-lg hover:shadow-sm"
        @click="push(route.name)"
      >
        <span>{{ route.name }} </span>
      </li>
    </nav>
  </div>
</template>

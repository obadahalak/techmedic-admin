<script setup>
 const props=defineProps(['mode','store']);
</script>
<template>
       <div class="h-screen grid place-items-center  mx-auto lg:w-1/3  px-5 ">
            <div class="bg-gray-700 rounded-md shadow-gray-400 shadow-lg  p-8  text-white">
                <h1 class="text-lg font-bold"> {{ props.mode }}</h1>
                
                <li class="mt-2 text-sm text-red-600" v-for="error in store.error">{{ error }}</li>
               
                <slot name="inputs" >

                    
                </slot>
           
              
            </div>
        </div>
</template>
<script setup>
</script>
<template>

<div id="modal" class="hidden  z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

          <div class="sm:flex sm:items-start">

            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">{{ type }} {{ mode }}</h3>


              <div class="mt-4  flex justify-center">

                <li class="text-sm  text-red-600" v-for="error in  company.error"> {{ error }}</li>

              </div>
              <div class="mt-2">
                <slot name="form">
                    
                </slot>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button type="button" :class="{ 'bg-red-600 hover:bg-red-500': type == 'delete' }"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              @click="submit">{{ type }}</button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
              @click="close">Cancel</button>
          </span>
        </div>
      </div>
    </div>
  </div>

</template>
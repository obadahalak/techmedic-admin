<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()

const props= defineProps(['label','modelValue']);

</script>

<template>
    <div>

        <label class="text-white">{{ label }}</label> 
           <input
        class="p-2 mt-2 w-full rounded-md"
        :placeholder="label"
        :value="modelValue"
        v-bind="$attrs"
        @input="$emit('update:modelValue',$event.target.value)"
        > 
        
    </div>
</template>
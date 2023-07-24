<script setup>
import { computed, ref, useAttrs } from 'vue'
const attrs = useAttrs()

const props = defineProps(['type', 'label', 'modelValue', 'data']);

</script>

<template>
    <div>


        <div v-if="type !== 'select'">
            <label class="text-white">{{ label }}</label>
            <input class="p-2 mt-2 w-full rounded-md" :placeholder="label" :value="modelValue" v-bind="$attrs"
                @input="$emit('update:modelValue', $event.target.value)">
        </div>


        <div v-if="type == 'select'">

            <label class="text-white">{{ label }}</label>

            <select @change="$emit('update:modelValue', $event.target.value)" class="p-2 mt-2 w-full rounded-md ">
                <option disabled class="p-2 bg-slate-50 border-2"> select one</option>
                <option class="p-2 bg-slate-50 border-2" :value="item.id" v-for="item in props.data">
                    {{ item.name }}
                </option>

            </select>



        </div>

    </div>
</template>
<script setup>
const props = defineProps(['type', 'label', 'modelValue', 'data'])
defineEmits('update:modelValue')
</script>

<template>
  <div>
    <div v-if="type !== 'select'">
      <label class="text-white">{{ label }}</label>
      <input
        class="p-2 mt-2 w-full rounded-md"
        :placeholder="label"
        :value="modelValue"
        v-bind="$attrs"
        required
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>

    <div v-if="type === 'select'">
      <label class="text-white">{{ label }}</label>

      <select
        required
        class="p-2 mt-2 w-full rounded-md "
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option
          disabled
          selected
          value="def"
          hidden

          class="p-2 bg-slate-50 border-2"
        >
          select one
        </option>
        <option
          v-for="item in props.data"
          class="p-2 bg-slate-50 border-2"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

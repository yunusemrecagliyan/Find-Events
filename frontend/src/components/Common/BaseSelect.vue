<template>
  <label
    v-if="label"
    :for="id"
    class="block mb-2 text-sm font-medium text-gray-900"
    >{{ label }}</label
  >
  <select
    :id="id"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-w-[120px] p-2.5"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    selected: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  computed: {
    id() {
      return Math.random().toString(36).substring(2, 9);
    },
  },
};
</script>

<style></style>

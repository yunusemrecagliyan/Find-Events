<template>
  <div class="relative">
    <label
      v-if="label"
      class="form-label block mb-1 font-semibold text-gray-700 text-sm"
      :for="id"
      >{{ label }}</label
    >
    <input
      class="px-2 py-2 h-12 rounded-md focus:rounded-lg focus:border-2 duration-150 leading-normal flex w-full placeholder-gray-600 text-xs text-gray-800 bg-white border border-secondary-200 font-sans text-left appearance-none outline-none transition-all"
      :class="[
        {
          'border-red-600': errors.length,
        },
      ]"
      :type="type"
      :id="id"
      :name="name"
      :value="modelValue"
      @input="handleInput"
    />
    <div v-if="errors.length" class="text-secondary-600 mt-1 text-sm">
      {{ errors[0] }}
    </div>
    <svg
      v-if="errors.length"
      class="absolute text-red-600 fill-current"
      style="top: 12px; right: 12px"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
  computed: {
    type() {
      return this.$attrs.type;
    },
    id() {
      return this.$attrs.id || this.$attrs.name || Math.random().toString();
    },
    name() {
      return this.$attrs.name;
    },
  },
};
</script>

<style></style>

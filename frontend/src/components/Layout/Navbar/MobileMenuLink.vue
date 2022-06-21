<template>
  <li
    class="text-sm text-gray-50 sm:text-gray-600 hover:text-secondary-400 flex gap-2 cursor-pointer"
  >
    <slot name="icon" />
    <router-link v-if="to" :to="to">
      {{ title }}
    </router-link>
    <button v-if="!to" @click="$emit('click')">
      {{ title }}
    </button>
  </li>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: false,
  },
});
</script>

<style></style>

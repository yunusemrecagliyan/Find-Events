<template>
  <li
    class="text-sm text-gray-50 sm:text-gray-600 hover:text-secondary-400 flex gap-2 cursor-pointer"
  >
    <slot name="icon" />
    <router-link :to="to">
      {{ title }}
    </router-link>
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
    required: true,
  },
});
</script>

<style></style>

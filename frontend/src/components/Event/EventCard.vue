<template>
  <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
    <div>
      {{ event }}
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  event: {
    type: Array,
    default: () => [],
  },
});
</script>

<style></style>

<template>
  <div>
    {{ events }}
  </div>
</template>

<script setup>
defineProps({
  events: {
    type: Array,
    default: () => [],
  },
});
</script>

<style></style>

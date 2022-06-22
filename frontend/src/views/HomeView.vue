<template>
  <div>Selam kanka nasılsın</div>
</template>

<script setup>
import { useEventStore } from "../stores/event";
const eventStore = useEventStore();
eventStore.getEvents();
</script>

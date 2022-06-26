<template>
  <div class="mt-8">{{ JSON.stringify(event) }}</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
import { useEventStore } from "../stores/event";

const route = useRoute();

const eventStore = useEventStore();

const { event } = storeToRefs(eventStore);

eventStore;

onMounted(() => {
  const eventId = route.params.id;
  eventStore.getEvent(eventId);
  console.log(eventId);
});
</script>

<style></style>

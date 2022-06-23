<template>
  <div class="flex flex-col w-full">
    <h2 class="text-2xl text-gray-600 font-bold">
      Bütün Etkinlikler ({{ events.length }})
    </h2>
    <div class="flex flex-wrap">
      <event-card
        v-for="event in events"
        :key="event.id"
        :event="event"
      ></event-card>
    </div>
  </div>
</template>

<script setup>
import EventCard from "./EventCard.vue";
defineProps({
  events: {
    type: Array,
    default: () => [],
  },
});
</script>

<style></style>

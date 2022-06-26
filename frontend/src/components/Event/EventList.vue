<template>
  <div class="flex flex-col w-full">
    <h2 class="text-2xl text-gray-600 font-bold">
      {{
        filters.city
          ? `${String(filters.city).toTurkishSuffix("de")}ki Etkinlikler`
          : "Bütün Etkinlikler"
      }}
    </h2>
    <span class="text-lg text-gray-600"> {{ filterString }}</span>
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
import { computed } from "vue-demi";
import EventCard from "./EventCard.vue";
const props = defineProps({
  events: {
    type: Array,
    default: () => [],
  },
  filters: {
    type: Object,
    default: () => {},
  },
});

const filterString = computed(() => {
  const { filters } = props;
  const { date, place } = filters;
  const filterString = [`Toplam ${props.events.length} etkinlik`];
  if (date) {
    filterString.push(
      date[1] == ""
        ? `${date[0]} tarihinden sonra`
        : `${date[0]} ile ${date[1]} tarihleri arasında`
    );
  }
  if (place) {
    filterString.push(String(place).toTurkishSuffix("de"));
  }

  return filterString.join(", ");
});
</script>

<style></style>

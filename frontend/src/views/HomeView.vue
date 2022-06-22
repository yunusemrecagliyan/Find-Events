<template>
  <div class="">
    <popular-carousel :popular-events="popularEvents"></popular-carousel>
    <!-- <event-list v-if="events.length" :events="events"></event-list> -->
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import qs from "qs";
import { storeToRefs } from "pinia";
import { useEventStore } from "../stores/event";
// import EventList from "../components/Event/EventList.vue";
import PopularCarousel from "../components/Home/PopularCarousel.vue";
const eventStore = useEventStore();
const { popularEvents } = storeToRefs(eventStore);

const getPopularEvents = async () => {
  const query = qs.stringify(
    {
      pagination: {
        start: 0,
        limit: 3,
      },
      filters: {
        events: {
          date: {
            $gte: dayjs().format("YYYY-MM-DD"),
          },
        },
      },
      populate: { events: { populate: ["category", "pictures"] } },
    },
    {
      encodeValuesOnly: true,
    }
  );
  eventStore.$patch({
    popularEvents: (await eventStore.getEvents(query)).data.map((event) => ({
      eventName: event.attributes.events.data[0].attributes.name,
      date: event.attributes.events.data[0].attributes.date,
      category:
        event.attributes.events.data[0].attributes.category.data.attributes
          .name,
      picture:
        event.attributes.events.data[0].attributes.pictures.data[0].attributes
          .url,
    })),
  });
};

getPopularEvents();
</script>

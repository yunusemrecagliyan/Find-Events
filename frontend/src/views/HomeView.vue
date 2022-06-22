<template>
  <div>
    <div
      class="flex md:flex-row flex-col justify-between min-w-0 w-full -mt-[3px] gap"
    >
      <artist-carousel
        class="w-full md:w-[25%] bg-black"
        :artists="artists"
      ></artist-carousel>
      <div
        class="flex flex-col p-4 justify-center items-center bg-gradient-to-t from-secondary-500 to-secondary-900 w-full text-white text-lg font-semibold gap-4"
      >
        <icon-logo class="h-32 w-full"></icon-logo>
        <span
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut pariatur
          nemo accusantium quaerat laborum! Earum assumenda quasi error? dolore
          dolorem.</span
        >
        <span
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
        </span>
      </div>
      <popular-carousel
        class="w-full md:w-[49%] bg-black"
        :popular-events="popularEvents"
      ></popular-carousel>
    </div>
    <div></div>
    <div class="container px-2 mx-auto">
      <event-filter
        :categories="
          categories.length
            ? [{ name: 'Hepsi', id: -1 }, ...categories, ...subCategories]
            : []
        "
        :sortByOptions="sortByOptions"
        :filterOptions="filterOptions"
        v-model="filter"
        class="my-4"
      ></event-filter>
      <event-list class="w-full md:w-[25%]" :events="events"></event-list>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import dayjs from "dayjs";
import qs from "qs";
import { storeToRefs } from "pinia";
import { useEventStore } from "../stores/event";
import { useArtistStore } from "../stores/artist";
import { useCategoryStore } from "../stores/category";
// import EventList from "../components/Event/EventList.vue";
import PopularCarousel from "../components/Home/PopularCarousel.vue";
import ArtistCarousel from "../components/Home/ArtistCarousel.vue";
import IconLogo from "../components/Icons/IconLogo.vue";
import EventList from "../components/Event/EventList.vue";
import EventFilter from "../components/Event/EventFilter.vue";
const eventStore = useEventStore();
const artistStore = useArtistStore();
const categoryStore = useCategoryStore();
const { popularEvents, events } = storeToRefs(eventStore);
const { artists } = storeToRefs(artistStore);
const { categories, subCategories } = storeToRefs(categoryStore);
const sortByOptions = [
  {
    label: "Tarih",
    value: "events.date",
  },
  {
    label: "Popülerlik",
    value: "viewCount",
  },
];

const filterOptions = [
  {
    label: "Tümü",
    value: "*",
  },
];

const filter = ref({
  sort: ["events.date"],
});

const getEvents = async (key, query) => {
  if (!query) {
    (query = {
      pagination: {
        start: 0,
        limit: 100,
      },
      sort: ["viewCount:desc"],
      filters: {
        events: {
          date: {
            $gte: dayjs().format("YYYY-MM-DD"),
          },
        },
      },
      populate: { events: { populate: ["category", "pictures"] } },
    }),
      {
        encodeValuesOnly: true,
      };
  }
  const customQuery = qs.stringify(query);
  eventStore.$patch({
    [key]: (await eventStore.getEvents(customQuery)).data?.map((event) => ({
      id: event.id,
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

const getArtists = async () => {
  const query = qs.stringify(
    {
      populate: ["pictures"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  artistStore.$patch({
    artists: (await artistStore.getArtists(query)).data.map((artist) => ({
      id: artist.id,
      artistName: `${artist.attributes.name} ${artist.attributes.surname}`,
      picture: artist.attributes.pictures.data[0].attributes.url,
    })),
  });
};
categoryStore.getCategories();
getArtists();
getEvents(
  "popularEvents",
  {
    pagination: {
      start: 0,
      limit: 3,
    },
    sort: ["viewCount:desc"],
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
getEvents(
  "events",
  {
    pagination: {
      start: 0,
      limit: 100,
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
</script>

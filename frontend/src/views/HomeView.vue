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
        <span> En yeni etkinlikler find your event adresinde.</span>
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
            ? [{ name: 'Hepsi', id: 0 }, ...categories, ...subCategories]
            : []
        "
        :sortByOptions="sortByOptions"
        :city-options="[{ label: 'Hepsi', value: 0 }, ...cityOptions]"
        :place-options="[{ label: 'Hepsi', value: 0 }, ...placeOptions]"
        @changed="(f) => filterUpdated(f)"
        class="my-4"
      ></event-filter>

      <event-list
        class="w-full"
        :events="events"
        :filters="filters"
      ></event-list>
    </div>
  </div>
</template>

<script setup>
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
import { useCityStore } from "../stores/city";
import { usePlaceStore } from "../stores/place";
import { onMounted } from "vue-demi";
import { computed, ref } from "vue";
const eventStore = useEventStore();
const artistStore = useArtistStore();
const categoryStore = useCategoryStore();
const cityStore = useCityStore();
const placeStore = usePlaceStore();

const { popularEvents, events } = storeToRefs(eventStore);
const { artists } = storeToRefs(artistStore);
const { categories, subCategories } = storeToRefs(categoryStore);
const { cities } = storeToRefs(cityStore);
const { places } = storeToRefs(placeStore);
const filters = ref({});
const placeOptions = computed(() =>
  places.value.map((place) => ({
    label: place.name,
    value: place.id,
  }))
);

const cityOptions = computed(() =>
  cities.value.map((city) => ({
    label: city.name,
    value: city.id,
  }))
);

const sortByOptions = [
  {
    label: "Tarih",
    value: "events.date:desc",
  },
  {
    label: "Popülerlik",
    value: "viewCount:desc",
  },
];

const filterUpdated = async (filter) => {
  filters.value = {
    city: cities.value.find((x) => x.id == filter.city)?.name ?? undefined,
    date: filter.date?.map((date) =>
      date ? dayjs(date).format("DD MMMM YYYY") : ""
    ),
    place: places.value.find((x) => x.id == filter.place)?.name ?? undefined,
  };
  let query = {
    pagination: {
      start: 0,
      limit: 100,
    },
    sort: [filter.sort],
    filters: {
      place: {
        id: {
          $eq: filter.place != 0 ? filter.place : undefined,
        },
        city: {
          id: {
            $eq: filter.city != 0 ? filter.city : undefined,
          },
        },
      },
      events: {
        $or: [
          {
            category: {
              $or: [
                {
                  id: {
                    $eq: filter.category != 0 ? filter.category : undefined,
                  },
                },
                {
                  subCategories: {
                    id: {
                      $in:
                        filter.subCategory != 0
                          ? filter.subCategory
                          : undefined,
                    },
                  },
                },
              ],
            },
          },
          {
            artists: {
              categories: {
                id: {
                  $in: filter.category != 0 ? filter.category : undefined,
                },
              },
            },
          },
        ],
        date: {
          $gte: filter.date?.[0]
            ? dayjs(filter.date?.[0]).format("YYYY-MM-DD")
            : dayjs().format("YYYY-MM-DD"),
          $lte: filter.date?.[1]
            ? dayjs(filter.date?.[1]).format("YYYY-MM-DD")
            : undefined,
        },
      },
    },
    populate: {
      place: "*",
      events: {
        populate: [
          "category",
          "pictures",
          "artists",
          "artists.pictures",
          "prices",
        ],
      },
    },
  };

  await getEvents("events", query, {
    encodeValuesOnly: true,
  });
};

const getEvents = async (key, query) => {
  const customQuery = qs.stringify(query);
  eventStore.$patch({
    [key]: (await eventStore.getEvents(customQuery))
      ?.filter((x, index, list) => {
        return list.findIndex((y) => y.id === x.id) === index;
      })
      .map(({ events, place, ...event }) => ({
        id: event.id,
        eventName: events[0].name,
        date: events[0].date,
        category: events[0].category.name,
        picture: events[0].pictures[0].url,
        prices: events[0].prices?.map((price) => ({
          price: price.price,
          discount: price.discount,
        })),
        place: place,
        artists: events[0].artists?.map((artist) => ({
          id: artist.id,
          name: artist.name,
          picture: artist.pictures[0].url,
        })),
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
    artists: (await artistStore.getArtists(query)).map((artist) => ({
      id: artist.id,
      artistName: `${artist.name ?? ""} ${artist.surname ?? ""}`,
      picture: artist.pictures[0].url,
    })),
  });
};

onMounted(async () => {
  await categoryStore.getCategories();
  await cityStore.getCities();
  await placeStore.getPlaces();
  await getArtists();
  await getEvents(
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
  await getEvents(
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
      populate: {
        place: "*",
        events: {
          populate: [
            "category",
            "pictures",
            "artists",
            "artists.pictures",
            "prices",
          ],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
});
</script>

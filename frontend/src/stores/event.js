import dayjs from "dayjs";
import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";
import qs from "qs";
export const useEventStore = defineStore({
  id: "event",
  state: () => ({
    events: [],
    popularEvents: [],
    event: {},
  }),
  getters: {},
  actions: {
    async getEvents(query) {
      try {
        if (!query) {
          (query = qs.stringify({
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
            populate: [
              { place: "*" },
              {
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
            ],
          })),
            {
              encodeValuesOnly: true,
            };
        }
        const { data } = await $axios.get(`/organizations?${query}`);
        return data.data;
      } catch (error) {
        return [];
      }
    },
    async getEvent(id) {
      try {
        var query = qs.stringify({
          filters: {
            id: { $eq: id },
          },
          populate: {
            place: { populate: "*" },
            events: {
              populate: "*",
            },
            organizer: { populate: "*" },
          },
        });
        const { data } = await $axios.get(`/organizations?${query}`);

        this.event = data.data[0];
        return { ...this.event };
      } catch (error) {
        return [];
      }
    },
  },
});

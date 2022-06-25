import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";
import qs from "qs";

export const usePlaceStore = defineStore({
  id: "place",
  state: () => ({
    places: [],
  }),
  getters: {},
  actions: {
    async getPlaces(cityId) {
      try {
        const query = qs.stringify({
          pagination: {
            start: 0,
            limit: 100,
          },
          filters: {
            city: {
              id: {
                $eq: cityId == 0 ? undefined : cityId,
              },
            },
          },
          populate: "city",
        });
        const { data } = await $axios.get(`/places?${query}`);
        this.places = data.data.map((place) => ({
          ...place.attributes,
          cityId: place.attributes.city.id,
          id: place.id,
        }));
        return data;
      } catch (error) {
        return [];
      }
    },
  },
});

import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";

export const usePlaceStore = defineStore({
  id: "place",
  state: () => ({
    places: [],
  }),
  getters: {},
  actions: {
    async getPlaces() {
      try {
        const { data } = await $axios.get(`/places?`);
        this.places = data.data.map((place) => ({
          ...place.attributes,
          id: place.id,
        }));
        return data;
      } catch (error) {
        return [];
      }
    },
  },
});

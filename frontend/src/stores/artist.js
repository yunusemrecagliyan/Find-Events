import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";
export const useArtistStore = defineStore({
  id: "artist",
  state: () => ({
    artists: [],
  }),
  getters: {},
  actions: {
    async getArtists(query) {
      try {
        const { data } = await $axios.get(`/artists?${query}`);
        return data;
      } catch (error) {
        return [];
      }
    },
  },
});

import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";
import { setToken } from "../services/jwt";

import config from "../services/jwt/config";

export const useCounterStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  getters: {
    isUserLoggedIn: (state) => !!state.user,
    userType: (state) => (state.user ? state.user.type : null),
  },
  actions: {
    async login({ email, password }) {
      const { data } = await $axios.post(config.LOGIN_ENDPOINT, {
        identifier: email,
        password,
      });
      setToken(data.jwt);
      this.user = data.user;
    },
  },
});

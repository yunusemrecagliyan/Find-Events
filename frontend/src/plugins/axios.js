import axios from "axios";

import { fillAxiosHeader, handleUnauthorizedRequest } from "@/services/jwt";

let $axios = axios.create({
  baseURL: `${import.meta.env.BaseURL}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

$axios = fillAxiosHeader($axios);
$axios = handleUnauthorizedRequest($axios);

const AxiosPlugin = {
  install(Vue) {
    Vue.prototype.$axios = $axios;
  },
};

export default AxiosPlugin;
export { $axios };

import axios from "axios";

import { fillAxiosHeader, handleUnauthorizedRequest } from "@/services/jwt";
import { normalizeStrapiReponse } from "@/services/response-normalizer";
let $axios = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

$axios = fillAxiosHeader($axios);
$axios = handleUnauthorizedRequest($axios);
$axios = normalizeStrapiReponse($axios);

const AxiosPlugin = {
  install(Vue) {
    Vue.prototype.$axios = $axios;
  },
};

export default AxiosPlugin;
export { $axios };

import { normalize } from "../plugins/normalize-strapi-response";

export function normalizeStrapiReponse(axiosInstance) {
  axiosInstance.interceptors.response.use((response) => {
    response = {
      ...response,
      data: { data: normalize(response.data.data), meta: response.data.meta },
    };

    return response;
  });
  return axiosInstance;
}

import type { UseFetchOptions } from "nuxt/app";
import { AuthCredential } from "@/types";
import { defu } from "defu";

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const config = useRuntimeConfig();
  const clearCredential = async () => {
    if (process.client) {
      useCookie("auth-token").value = null;
      window.location.replace("/sign-in");
    }
  };

  const credential = useCookie<AuthCredential | null>("auth-token", {
    expires: new Date(Date.now() + 12096e5), // 2 weeks from now
    sameSite: "lax",
    path: "/",
    watch: true,
  });
  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.API_ENDPOINT,
    key: url,
    headers: credential.value?.token
      ? {
          Accept: "application/json",
          Authorization: "Bearer " + credential.value?.token,
        }
      : {
          Accept: "application/json",
        },
    onResponseError(context) {
      // console.log(context.response.status)
      if (context.response.status === 401) {
        return clearCredential();
      }

      if (context.response.status === 404) {
        throw showError({
          message: "Data not found",
          statusCode: 404,
        });
      }

      if (context.response.status === 500) {
        throw showError({
          message: context.response._data.message,
          statusCode: 500,
        });
      }
    },
  };

  const params = defu(options, defaults);
  return useFetch(url, params);
}

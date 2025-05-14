import axios from "axios";
import { AuthCredential } from "@/types";

export default function () {
  const config = useRuntimeConfig();

  const credential = useCookie<AuthCredential | null>("auth-token", {
    expires: new Date(Date.now() + 12096e5), // 2 weeks from now
    sameSite: "lax",
    path: "/",
    watch: true,
  });

  const axiosContext = axios.create({
    baseURL: config.public.API_ENDPOINT,
    headers: {
      Authorization: "Bearer " + credential.value?.token,
    },
  });

  const clearCredential = async () => {
    if (process.client) {
      useCookie("auth-token").value = null;
      window.location.replace("/sign-in");
    }
  };

  axiosContext.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Clear all cookies here
        // For example, if you're using js-cookie, you can remove a cookie as follows:
        // Cookies.remove('your-cookie-name');
        // If you want to remove all cookies, you might need to remove them one by one
        // After clearing the cookies, you might want to redirect users to the login page or refresh the
        clearCredential();
      }

      return Promise.reject(error);
    }
  );

  return {
    axiosRequest: axiosContext,
  };
}

import { AuthCredential } from "@/types";
export default defineNuxtPlugin({
  name: "01.auth-base",
  enforce: "pre",
  async setup(nuxtApp) {
    const credential = useCookie<AuthCredential | null>("auth-token", {
      expires: new Date(Date.now() + 12096e5), // 2 weeks from now
      sameSite: "lax",
      path: "/",
      watch: true,
    });

    addRouteMiddleware("guest", async () => {
      if (credential.value?.token) {
        return await navigateTo("/");
      }
    });

    addRouteMiddleware("auth", async () => {
      if (!credential.value?.token) {
        return await navigateTo("/sign-in");
      }
    });

    const setCredential = (credentialProperty: Required<AuthCredential>) => {
      credential.value = credentialProperty;
    };

    const clearCredential = async () => {
      if (process.client) {
        useCookie("auth-token").value = null;
        window.location.replace("/sign-in");
      }
    };
    // tst
    return {
      provide: {
        clearCredential,
        setCredential,
      },
    };
  },
});

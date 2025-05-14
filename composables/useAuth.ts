import { Role, AuthCredential, AuthUser, GeneralResponse } from "@/types";

export default function () {
  const $credetial = useCookie<AuthCredential | null>("auth-token").value;
  const $user = useState<AuthUser | undefined>("auth-user");
  const $loading = ref<boolean>(false);
  const { $clearCredential } = useNuxtApp();

  /**
   * set auth user property
   */
  function $setAuthUser(user: AuthUser | undefined) {
    $user.value = user;
  }

  async function fetchAuth(url: string) {
    const { data } = await useCustomFetch<GeneralResponse<AuthUser>>(url, {
      method: "GET",
    });
    const user = data.value?.data;
    $setAuthUser(user);
  }

  async function logoutAuth(url: string) {
    await useCustomFetch(url, {
      method: "POST",
    });
    $clearCredential();
  }

  /**
   * fetch credential current logged in user
   */
  async function $useFetchAuthProfile() {
    $loading.value = true;
    const url =
      $credetial?.role === Role.ADMIN ? "/admins/profile" : "/users/profile";
    await fetchAuth(url);
    $loading.value = false;
  }

  /**
   * handle logout for all users
   */
  async function $logout() {
    $loading.value = true;
    const url =
      $credetial?.role === Role.ADMIN ? "/admins/logout" : "/users/profile";
    await logoutAuth(url);
    $loading.value = false;
  }

  const $isUser = computed(() => {
    return $credetial?.role === Role.USER;
  });

  const $isAdmin = computed(() => {
    return $credetial?.role === Role.ADMIN;
  });

  return {
    $credetial,
    $isLogin: !!$credetial,
    $logout,
    $loading,
    $setAuthUser,
    $user,
    $useFetchAuthProfile,
    $isUser,
    $isAdmin,
  };
}

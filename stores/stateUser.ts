import { defineStore, acceptHMRUpdate } from "pinia";

export const useStateUser = defineStore("stateUser", () => {
  const status = ref("waiting_for_payment");
  // ts-ignore
  const page = ref(1);

  return {
    status,
    page,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStateUser, import.meta.hot));
}

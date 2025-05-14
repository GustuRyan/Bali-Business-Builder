import { defineStore, acceptHMRUpdate } from "pinia";

export const useStateAdmin = defineStore("stateAdmin", () => {
  const page = ref(1);
  const dateRange = ref<string[] | null>();
  const search = ref("");
  const status = ref("");
  return {
    page,
    dateRange,
    search,
    status,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStateAdmin, import.meta.hot));
}

import { useLocalStorage } from "@vueuse/core";

export const usePhone = () => {
  const phoneLocalStrorage = useLocalStorage<string | undefined>(
    "phone-local",
    undefined
  );

  return {
    phoneLocalStrorage,
  };
};

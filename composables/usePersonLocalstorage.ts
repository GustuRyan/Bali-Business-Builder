import { useLocalStorage, StorageSerializers } from "@vueuse/core";
import { FormUser, IntroForm, AuthForm } from "@/types";
export const usePersonLocalstorage = () => {
  const localPerson = useLocalStorage<FormUser[]>("localPerson", []);

  /**
   * save auth helper
   * so when reload page, it will autofill the form
   *
   */
  const authHelper = useLocalStorage<AuthForm>(
    "authHelper",
    {
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      mobile_number: undefined,
    },
    {
      serializer: StorageSerializers.object,
    }
  );

  return {
    localPerson,
    authHelper,
  };
};

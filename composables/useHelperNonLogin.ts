import { useLocalStorage, StorageSerializers } from "@vueuse/core";
import { AuthUser } from "@/types";
export default function () {
  const authUser = useLocalStorage<AuthUser>("authnonlogin", null, {
    serializer: StorageSerializers.object,
  });

  const stepForm = useLocalStorage("steps", {
    validSelectedServices: false,
    validSelectedIdentity: false,
    validConfirmOrder: false,
    validConfirmPayment: false,
  });
  const openForm = useLocalStorage("openForm", {
    validSelectedServices: false,
    validSelectedIdentity: false,
    validConfirmOrder: false,
    validConfirmPayment: false,
  });

  return {
    authUser,
    stepForm,
    openForm,
  };
}

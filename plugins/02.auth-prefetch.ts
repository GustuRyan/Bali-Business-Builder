import { Root, Product } from "@/types";
import { useProductStore } from "~/stores/product";
export default defineNuxtPlugin({
  name: "02.auth-prefetch",
  enforce: "post", // working on client
  async setup(context) {
    const { $isLogin, $useFetchAuthProfile } = useAuth();
    const store = useProductStore();
    if ($isLogin) {
      await $useFetchAuthProfile();
    }
    // @ts-ignore
    const { data } = await useCustomFetch<Root>(
      // @ts-ignore
      "/products?lang=" + context.$i18n?.locale?._value ?? "en",
      {
        method: "GET",
      }
    );
    const products: Product[] | undefined = data.value?.data;
    store.setProduct(products);
  },
});

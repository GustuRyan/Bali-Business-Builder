import { defineStore } from "pinia";
import { Product } from "@/types";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
  }),
  getters: {
    getProduct(): Product[] {
      return this.products;
    },
    getProductById: (state) => {
      return (ProductId: number) =>
        state.products.find((product) => product.id === ProductId);
    },
  },
  actions: {
    setProduct(product: Product[] | undefined) {
      if (product?.length) {
        this.products = product;
      } else {
        this.products = [];
      }
    },
  },
});

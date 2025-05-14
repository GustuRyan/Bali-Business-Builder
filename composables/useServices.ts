import { useProductStore } from "~/stores/product";
import { storeToRefs } from "pinia";
export const useServices = () => {
  const store = useProductStore();
  const { getProduct: products } = storeToRefs(store);

  const extendVisas = computed(() => {
    return [...products.value.filter((p) => p.is_extend === 1)];
  });

  const newVisas = computed(() => {
    return [...products.value.filter((p) => p.is_extend === 0)];
  });

  const serviceList = [
    {
      slug: "b221a",
      image: "/icon-visa-and-passport.png",
      bgColor: "bg-emerald-600",
    },
    {
      slug: "visa-on-arrival",
      image: "/icon-visa-and-ticket.png",
      bgColor: "bg-primary-600",
    },
    {
      slug: "extend-visa",
      image: "/icon-visa-passport-ticket.png",
      bgColor: "bg-amber-600",
    },
  ];

  const applyVisa = [
    {
      image: "/icon-nav-passport-visa.png",
      label: "B211A",
      slug: "/services/b211a",
    },
    {
      image: "/icon-nav-passport-ticket.png",
      label: "Visa On Arrival",
      slug: "/services/visa-on-arrival",
    },
  ];

  const extendVisa = [
    {
      image: "/icon-nav-passport-visa-stempel.png",
      label: "Extend B211A",
      slug: "/services/extend-b211a",
    },
    {
      image: "/icon-nav-passport-ticket-stempel.png",
      label: "Extend Visa On Arrival",
      slug: "/services/extend-visa-on-arrival",
    },
  ];

  const serviceHeaders = {
    title: "One-stop Visa in Indonesia",
    description: `We offers services that hassle-free and streamlined process for obtaining visas to enter and stay in Indonesia.`,
  };

  return {
    serviceList,
    serviceHeaders,
    applyVisa,
    extendVisa,
    extendVisas,
    newVisas,
    products,
  };
};

import { defineStore } from "pinia";
import { IntroForm, FormUser, Product, AuthUser } from "@/types";

export const useFormStore = defineStore("form", {
  state: () => ({
    intro: null || ({} as IntroForm),
    /**
     * all person not for form
     *
     */
    persons: [] as FormUser[],
    /**
     * selected person
     */
    formPersons: [] as FormUser[],
    loading: false,
    product: {} as Product,
    user: {},
    totalOrder: 0 as number,
  }),
  getters: {
    getIntro(): IntroForm {
      return this.intro;
    },
    getPersons(): FormUser[] {
      return this.persons;
    },
    getProduct(): Product {
      return this.product;
    },
    totalPerson(): number {
      return this.formPersons.length;
    },
    isLoading(): boolean {
      return this.loading;
    },
    getUser(): any {
      return this.user;
    },
    getTotalOrder(): number {
      return this.totalOrder;
    },
  },
  actions: {
    setIntro(value: IntroForm) {
      this.intro = value;
    },
    setPerson(value: FormUser[]) {
      this.persons = value;
    },
    setFormPersons(value: FormUser[]) {
      this.formPersons = value;
    },
    pushPerson(value: FormUser) {
      this.persons.push(value);
    },
    pushFormPerson(value: FormUser) {
      this.formPersons.push(value);
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setProduct(value: Product | undefined) {
      if (value) {
        this.product = value;
      } else {
        this.product = {} as Product;
      }
    },
    removePerson(id: number) {
      this.persons = [...this.persons.filter((p) => p.id !== id)];
    },
    removeFormPerson(id: number) {
      this.formPersons = [...this.formPersons.filter((p) => p.id !== id)];
    },
    setUser(value: any) {
      this.user = value;
    },
    setTotalOrder(value: number) {
      this.totalOrder = value;
    },
    clearFormPersons() {
      this.formPersons = [];
      this.persons = [];
    },
  },
});

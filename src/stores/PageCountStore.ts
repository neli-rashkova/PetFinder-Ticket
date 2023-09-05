import { defineStore } from "pinia";

export const usePageCountStore = defineStore({
  id: "PageCountStore",
  state: () => ({
    pageCount: 1,
  }),
  actions: {
    increment() {
      this.pageCount++;
    },
    decrement() {
      this.pageCount--;
    },
  },
});

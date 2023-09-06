import { defineStore } from "pinia";

export const usePageCountStore = defineStore({
  id: "PageCountStore",
  state: () => ({
    pageCount: 1,
    totalCount: 0,
  }),
  actions: {
    increment() {
      if (this.pageCount < this.totalCount) {
        this.pageCount++;
      }
    },
    decrement() {
      if (this.pageCount > 1) {
        this.pageCount--;
      }
    },
  },
});

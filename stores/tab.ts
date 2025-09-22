import { TAB_INDEX } from "@/enums/tab-index.enum";
import { defineStore } from "pinia";

export const useTabStore = defineStore("tab", {
  state: () => ({ index: TAB_INDEX.UPLOADER }),
  actions: {
    setTabIndex(n) {
      this.index = n;
    },
    tabIndex() {
      return this.index;
    },
  },
});

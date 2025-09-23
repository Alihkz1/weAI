import { TAB_INDEX } from "@/enums/tab-index.enum";
import { defineStore } from "pinia";

interface TabState {
  index: TAB_INDEX;
}

export const useTabStore = defineStore("tab", {
  state: (): TabState => ({ index: TAB_INDEX.UPLOADER }),
  actions: {
    setTabIndex(n: TAB_INDEX) {
      this.index = n;
    },
  },
});

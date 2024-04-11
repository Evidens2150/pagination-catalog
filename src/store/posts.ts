import { defineStore } from "pinia";

function findItemById(list, id) {
  return list.find((item) => "" + item.id === "" + id) || null;
}

export const usePostListStore = defineStore("postList", {
  state: () => ({
    fullList: [],
  }),
  actions: {
    fillList(list) {
      this.fullList = list;
    },
    addToFavorite(id) {
      const currentItem = findItemById(this.fullList, id);
      if (!currentItem) return;
      currentItem.sublist = "favorite";
    },
    addToUnfavorite(id) {
      const currentItem = findItemById(this.fullList, id);
      if (!currentItem) return;
      currentItem.sublist = "unfavorite";
    },
    returnItemToFullList(id) {
      const currentItem = findItemById(this.fullList, id);
      if (!currentItem) return;
      currentItem.sublist = "";
    },
  },
  getters: {
    getFullList: (state) => state.fullList,
    getMainList: (state) => state.fullList.filter((item) => !item.sublist),
    getFavoriteList: (state) =>
      state.fullList.filter((item) => item.sublist === "favorite"),
    getUnfavoriteList: (state) =>
      state.fullList.filter((item) => item.sublist === "unfavorite"),
  },
});
